
def calculate_coordinates(coordinates, square_root_of_number_of_points_to_return):
    # coordinates: [(lat, long), (lat, long)].
    # The first is the NW point, the 2nd is SE
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
