from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json

from backend.get_classifications import have_the_computer_classify


# @csrf_exempt
def index(request):
    ne_lat = request.GET.get('nelat', '')
    ne_lng = request.GET.get('nelng', '')
    sw_lat = request.GET.get('swlat', '')
    sw_lng = request.GET.get('swlng', '')

    if not ne_lat:
        # Example fig at 33.736207, -84.352681
        ne_lat = 33.736207
        ne_lng = -84.352681
        sw_lat = 33.736207
        sw_lng = -84.352681

    all_coordinates = have_the_computer_classify(
        [(float(ne_lat), float(ne_lng)), (float(sw_lat), float(sw_lng))], 2)


    # all_coordinates = []

    # for coordinate in coordinates:
    #     g_maps_picture = talk_to_google(coordinate)
    #     ibm_results = send_pic_to_IBM(g_maps_picture)
    #     class_options = ibm_results['images'][0]['classifiers'][0]['classes']
    #     confidence = max([item['score'] for item in class_options])
    #     most_likely_class = [item['class'] for item in class_options if item['score'] == confidence]

    #     all_coordinates += [{
    #         'coordinates': (coordinate),
    #         'url_to_picture': ibm_results['images'][0]['source_url'],
    #         'ibm_confidence': confidence,
    #         'class': most_likely_class[0]
    #     }]
    
    # Since things worked, save the results to the model


    return HttpResponse(json.dumps(all_coordinates))


