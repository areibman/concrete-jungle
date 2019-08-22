from django.shortcuts import render
from django.http import HttpResponse

import requests
import json
import urllib
import urllib.parse
# import os
from os.path import abspath
import zipfile
from watson_developer_cloud import VisualRecognitionV3

from backend.get_points import calculate_coordinates
from timbr.local_only_no_git import GOOGLE_API_KEY, IBM_API_KEY


def index(request):
    coordinates = calculate_coordinates(
        [(33.780000, -84.285000), (33.640000, -84.103000)], 2)
    print("COORDINATES:", coordinates)

    all_coordinates = []

    for coordinate in coordinates:
        g_maps_pic = talk_to_google(coordinate)
        all_coordinates += [send_pic_to_IBM(g_maps_pic)]

    return HttpResponse(json.dumps(all_coordinates))


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

    # urllib.request.urlretrieve(g_maps_picture, "pic_from_google.jpg")
    # g_maps_picture = urllib.parse.quote(g_maps_picture)
    # print("Encoded:", g_maps_picture)

    classes_result = visual_recognition.classify(
        url=g_maps_picture,
        classifier_ids=["DefaultCustomModel_454633185"]).get_result()
        # threshold=0).get_result()
    print("CLASSIFICATION FROM IBM:", json.dumps(classes_result, indent=2))

    return classes_result