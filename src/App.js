import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import GoogleApiWrapper from "./MapContainer";
// import { DrawingMap } from "./DrawingMap";
import { ResultsMap } from "./ResultsMap";
import { SelectorMap } from "./SelectorMap";
import Button from "@material-ui/core/Button";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  MarkerClusterer,
  Marker,
  Rectangle
} from "react-google-maps-api";

function App() {
  const [polygons, setPolygons] = useState([]);
  const [val, searching] = useState({ isSearching: true });
  const setSearchable = () => {
    this.setState({ isSearching: true });
  };
  return (
    <div className="App">
      <SelectorMap />
      {/* <div style={{ width: "45%", margin: "15px" }}>
        <LoadingOverlay
          active={!searching.length}
          spinner
          text="Searching for fruit trees..."
        >
          <div>
            <LoadScript
              id="script-loader"
              googleMapsApiKey="AIzaSyBEo5uBhm-RULKicj-jm4COiBTKEyjFdqE"
              libraries={["drawing"]}
            >
              <GoogleMap
                id="drawing-manager-example"
                mapContainerStyle={{
                  height: "750px"
                }}
                zoom={9}
                center={{
                  lat: 33.753746,
                  lng: -84.38633
                }}
              >
                <DrawingManager
                  drawingMode={"rectangle"}
                  onRectangleComplete={polygon => {
                    setPolygons([...polygons, polygon]);
                    polygon.setMap(null);
                  }}
                  onCircleComplete={polygon => {
                    polygon.setMap(null);
                  }}
                  onPolygonComplete={polygon => {
                    polygon.setMap(null);
                  }}
                  onMarkerComplete={polygon => {
                    polygon.setMap(null);
                  }}
                  onPolylineComplete={polygon => {
                    polygon.setMap(null);
                  }}
                />
                {polygons.map(polygon => (
                  <Rectangle {...polygon} />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </LoadingOverlay>
        <React.Fragment>
          <Button
            variant="contained"
            color="secondary"
            style={{
              top: "10px",
              zIndex: 100,
              margin: "10px"
            }}
            onClick={() => setPolygons([...val, 1])}
          >
            Undo
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{
              top: "10px",
              zIndex: 100,
              margin: "10px"
            }}
            onClick={setSearchable}
            disabled={!polygons.length}
          >
            Submit
          </Button>
        </React.Fragment>
      </div> */}
    </div>
  );
}

export default App;
