import React, { Component } from "react";
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  MarkerClusterer,
  Polygon,
  Marker
} from "react-google-maps-api";

export class ResultsMap extends Component {
  render() {
    return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}
        libraries={["drawing", "visualization"]}
      >
        <GoogleMap
          id="marker-example"
          mapContainerStyle={{
            height: "400px",
            width: "800px"
          }}
          zoom={10}
          center={{
            lat: 33.753746,
            lng: -84.38633
          }}
        >
          <Polygon
            onLoad={polygon => {
              console.log("polygon: ", polygon);
            }}
            paths={[
              { lat: 33.753746, lng: -84.38633 },
              { lat: 33.763746, lng: -84.38633 },
              { lat: 33.763746, lng: -84.39633 },
              { lat: 33.753746, lng: -84.39633 }
            ]}
            options={{
              fillColor: "green",
              fillOpacity: 0.25,
              strokeColor: "red",
              strokeOpacity: 1,
              strokeWeight: 2,
              clickable: false,
              draggable: false,
              editable: false,
              geodesic: false,
              zIndex: 1
            }}
          />
          <Marker
            onLoad={marker => {
              console.log("marker: ", marker);
            }}
            position={{
              lat: 33.753746,
              lng: -84.38633
            }}
          />
        </GoogleMap>
      </LoadScript>
    );
  }
}
