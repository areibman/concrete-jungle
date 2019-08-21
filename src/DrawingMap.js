import React, { Component, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  MarkerClusterer,
  Marker
} from "react-google-maps-api";

export class DrawingMap extends Component {
  render() {
    return (
      <React.Fragment>
        <LoadScript
          id="script-loader"
          googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}
          libraries={["drawing"]}
        >
          <GoogleMap
            id="drawing-manager-example"
            mapContainerStyle={{
              height: "400px",
              width: "800px"
            }}
            zoom={9}
            center={{
              lat: 33.753746,
              lng: -84.38633
            }}
          >
            <DrawingManager
              onLoad={drawingManager => {
                console.log(drawingManager);
              }}
              drawingMode={true}
              onPolygonComplete={polygon => console.log(polygon)}
              onPolylineComplete={polygon => console.log(polygon)}
              onCircleComplete={polygon => console.log(polygon)}
              onRectangleComplete={polygon => console.log(polygon)}
            />
          </GoogleMap>
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "300px",
              zIndex: 100
            }}
            onClick={() => setPolygons(polygons.slice(0, -1))}
          >
            Undo
          </button>
        </LoadScript>
      </React.Fragment>
    );
  }
}
