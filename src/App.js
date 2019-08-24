import React, { useState } from "react";
import "./App.css";
import { SelectorMap } from "./SelectorMap";

function App() {
  return (
    <div className="App">
      <SelectorMap />
      {/* <Deck /> */}
      {/* <div style={{ width: "45%", margin: "15px" }}>
        <LoadingOverlay
          active={!searching.length}
          spinner
          text="Searching for fruit trees..."
        >
          <div>
            <LoadScript
              id="script-loader"
              googleMapsApiKey=process.env.REACT_APP_MAPS_KEY
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
