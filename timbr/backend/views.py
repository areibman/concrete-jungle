import json

from django.shortcuts import render
from django.http import HttpResponse
from .models import CoordinatesRequested

from backend.get_classifications import have_the_computer_classify


def index(request):
    ne_lat = request.GET.get('nelat', '')
    ne_lng = request.GET.get('nelng', '')
    sw_lat = request.GET.get('swlat', '')
    sw_lng = request.GET.get('swlng', '')

    if not ne_lat:
        # Example data: fig at 33.736207, -84.352681
        ne_lat = 33.736207
        ne_lng = -84.352681
        sw_lat = 33.736207
        sw_lng = -84.352681

    all_coordinates = have_the_computer_classify(
        [(float(ne_lat), float(ne_lng)), (float(sw_lat), float(sw_lng))], 4)
    
    # Save what we've learned
    for coordinate in all_coordinates:
        coordinate_to_save = CoordinatesRequested(
            latitude = coordinate['coordinates'][0],
            longitude = coordinate['coordinates'][1],
            ibm_classification = coordinate['class_'])
        coordinate_to_save.save()

    return HttpResponse(json.dumps(all_coordinates))


def save_user_feedback(request):
    """ Once users have confirmed/denied IBMs classification,
        save their response"""
    # The get request should include the lat & lng for identification,
    # and whether the user agrees with the classification.
    lat = request.GET.get('lat', '')
    lng = request.GET.get('lng', '')
    confirmation = request.GET.get('confirmed', '')

    model_entry = CoordinatesRequested.objects.filter(latitude=lat,
        longitude=lng)[0]
    
    model_entry(user_agrees_with_classification = bool(confirmation))
    model_entry.save()
