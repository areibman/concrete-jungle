from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

import json
from os.path import abspath
from watson_developer_cloud import VisualRecognitionV3

from backend.get_points import calculate_coordinates
from timbr.local_only_no_git import GOOGLE_API_KEY, IBM_API_KEY

# @csrf_exempt
def index(request):
    ne_lat = request.GET.get('nelat', '')
    ne_lng = request.GET.get('nelng', '')
    sw_lat = request.GET.get('swlat', '')
    sw_lng = request.GET.get('swlng', '')

    if not ne_lat:
        ne_lat = 36
        ne_lng = -23
        sw_lat = 37
        sw_lng = -22

    coordinates = calculate_coordinates(
        [(float(ne_lat), float(ne_lng)), (float(sw_lat), float(sw_lng))], 1)

    print("COORDINATES:", coordinates)

    all_coordinates = []

    for coordinate in coordinates:
        g_maps_pic = talk_to_google(coordinate)
        all_coordinates += [send_pic_to_IBM(g_maps_pic)]
    
    # Since things worked, save the results to the model


    # Return something:
    info_to_give_alex = [{'coordinates': ('83.123456789', '-35.987654321'),
      'url_to_picture': 'https://images.google.com/?cute&cat',
      'ibm_confidence': .50,
      'class': 'Fig'},
      {'coordinates': ('84.123456789', '-36.987654321'),
      'url_to_picture': 'https://images.google.com/?cute&cat',
      'ibm_confidence': .40,
      'class': 'Prickly Pear'}
      ]

    return HttpResponse(json.dumps(info_to_give_alex))


def talk_to_google(coordinate):
    """Send a request to Google Maps for an image from streetview"""
    default_size = "1800x1200"
    heading = 120
    fov = 120
    g_url = "https://maps.googleapis.com/maps/api/streetview" + \
        "?size=" + str(default_size) + "&heading=" + str(heading) + \
        "&key=" + str(GOOGLE_API_KEY) + "&location=" + \
        str(coordinate[0]) + "," + str(coordinate[1]) + \
        "&fov=" + str(fov)
    # There's a "range" parameter that may be useful if we're getting lots
    # of blank responses.
    print("G_URL:", g_url)
    return g_url


def send_pic_to_IBM(g_maps_picture):
    # example instructions: https://github.com/IBM/drones-iot-visual-recognition/blob/master/Flooding/VRMTEST.md
    # https://dataplatform.cloud.ibm.com/studio/watson-vision-combined/DefaultCustomModel_454633185/view?project_id=1d79d057-afb9-4a45-a7ac-26bc8b927d27&training_definition_id=ce616b01-390f-4ed0-8121-9cddcb17c256

    visual_recognition = VisualRecognitionV3(
        '2018-03-19',
        iam_apikey=IBM_API_KEY
    )

    classes_result = visual_recognition.classify(
        url=g_maps_picture,
        classifier_ids=["DefaultCustomModel_454633185"]).get_result()

    print("CLASSIFICATION FROM IBM:", json.dumps(classes_result, indent=2))

    return classes_result
