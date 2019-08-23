import json
from watson_developer_cloud import VisualRecognitionV3

from timbr.local_only_no_git import GOOGLE_API_KEY, IBM_API_KEY


def have_the_computer_classify(coordinates,
    square_root_of_number_of_points_to_return):

    coordinates = calculate_coordinates(coordinates,
        square_root_of_number_of_points_to_return)

    all_coordinates = []

    for coordinate in coordinates:
        g_maps_picture = talk_to_google(coordinate)
        ibm_results = send_pic_to_IBM(g_maps_picture)
        class_options = ibm_results['images'][0]['classifiers'][0]['classes']
        confidence = max([item['score'] for item in class_options])
        most_likely_class = [item['class'] for item in class_options if item[
            'score'] == confidence]

        all_coordinates += [{
            'coordinates': (coordinate),
            'url_to_picture': ibm_results['images'][0]['source_url'],
            'ibm_confidence': confidence,
            'class_': most_likely_class[0]
        }]
    
    return all_coordinates


def calculate_coordinates(coordinates,
    square_root_of_number_of_points_to_return):
    # coordinates: [(lat, long), (lat, long)].
    # square_root_of_number_of_points_to_return: int
    returned_coordinates = []

    lat_delta = (coordinates[0][0] - coordinates[1][0]) / \
        square_root_of_number_of_points_to_return
    lon_delta = (coordinates[0][1] - coordinates[1][1]) / \
        square_root_of_number_of_points_to_return

    lat = coordinates[0][0]
    lon = coordinates[0][1]
    for val in range(square_root_of_number_of_points_to_return):
        for second_val in range(square_root_of_number_of_points_to_return):
            returned_coordinates += [(lat + (lat_delta * second_val), lon)]
        lon += lon_delta

    return returned_coordinates


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
    visual_recognition = VisualRecognitionV3(
        '2018-03-19',
        iam_apikey=IBM_API_KEY
    )

    classes_result = visual_recognition.classify(
        url=g_maps_picture,
        classifier_ids=["DefaultCustomModel_454633185"],
        threshold='0').get_result()

    print("CLASSIFICATION FROM IBM:", json.dumps(classes_result, indent=2))

    return classes_result
