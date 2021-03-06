import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import CardResponses from "./CardResponses";
import { Card, CardWrapper } from "react-swipeable-cards";

import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  Marker,
  Rectangle
} from "react-google-maps-api";

export class SelectorMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
      isSearching: false,
      polygonsList: [],
      data: {},
      markers: [],
      apiResponse: [],
      treeResponses: [],
      savedTrees: []
    };
  }

  resetSelection = () => {
    this.setState({ polygonsList: [] });
  };

  toggleSearchable = () => {
    this.setState({ isSearching: !this.state.isSearching });
  };

  iconClickHandler = () => {
    console.log("hi");
    this.setState({ apiResponse: [] });
  };
  fetchData = () => {
    this.toggleSearchable();
    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDRESS}?nelat=${this.state.coordinatePair.ne.lat}&nelng=${this.state.coordinatePair.ne.lng}&swlat=${this.state.coordinatePair.sw.lat}&swlng=${this.state.coordinatePair.sw.lng}`
      )
      .then(response => {
        // create an array of contacts only with relevant data

        // create a new "State" object without mutating
        // the original State object.
        const newState = Object.assign({}, this.state, {
          response: response.data
        });

        // store the new state object in the component's state
        this.setState({ apiResponse: response.data });
        this.setState({ treeResponses: response.data });
        this.toggleSearchable();
        console.log(this.state);
      })
      .catch(error => {
        console.log(error);
        this.toggleSearchable();
      });
  };

  renderCards() {
    return (
      <Card key={"default"}>
        <img
          src={"largecjlogo.jpg"}
          style={{ width: "180px", height: "180px", marginTop: "20px" }}
        />
        <h2 style={{ marginBottom: "70px" }}>
          Select an area on the map and press submit to get started!
        </h2>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <img
            src={"arrow.jpg"}
            style={{ width: "100px", height: "100px", margin: "20px" }}
          />
        </div>
      </Card>
    );
  }

  render() {
    console.log(this.state);
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "45%", margin: "15px" }}>
          <LoadingOverlay
            active={this.state.isSearching}
            spinner
            text="Searching for fruit trees..."
          >
            <LoadScript
              id="script-loader"
              googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}
              libraries={["drawing"]}
            >
              <GoogleMap
                id="drawing-manager-example"
                mapContainerStyle={{
                  height: "750px"
                }}
                zoom={13}
                center={{
                  lat: 33.730746,
                  lng: -84.36633
                }}
              >
                <DrawingManager
                  drawingMode={"rectangle"}
                  onRectangleComplete={polygon => {
                    this.setState({ polygonsList: [polygon] });
                    let ne = polygon
                      .getBounds()
                      .getNorthEast()
                      .toJSON();
                    let sw = polygon
                      .getBounds()
                      .getSouthWest()
                      .toJSON();
                    this.setState({ coordinatePair: { ne, sw } });
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
                {this.state.polygonsList.map((polygon, ndx) => (
                  <Rectangle
                    {...polygon}
                    key={ndx}
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
                ))}
                {this.state.apiResponse.map((foundTree, ndx) => (
                  <Marker
                    {...foundTree}
                    key={ndx}
                    onLoad={marker => {
                      console.log("marker: ", marker);
                    }}
                    position={{
                      lat: foundTree.coordinates[0],
                      lng: foundTree.coordinates[1]
                    }}
                    clickable={true}
                    icon={"radar.svg"}
                    onClick={this.iconClickHandler}
                  />
                ))}
                {this.state.savedTrees.map((foundTree, ndx) => (
                  <Marker
                    {...foundTree}
                    key={ndx}
                    position={{
                      lat: foundTree.coordinates[0],
                      lng: foundTree.coordinates[1]
                    }}
                    clickable={true}
                    icon={"fruit-tree.svg"}
                    onClick={this.iconClickHandler}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
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
              onClick={this.resetSelection}
              disabled={this.state.isSearching}
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
              onClick={this.fetchData}
              disabled={
                !this.state.polygonsList.length || this.state.isSearching
              }
            >
              Submit
            </Button>
          </React.Fragment>
        </div>
        <div style={{ width: "45%", marginRight: "15px", marginLeft: "15px" }}>
          <img src={"timber.png"} style={{ marginBottom: "-30px" }} />
          {this.state.apiResponse.length ? (
            <CardResponses
              responses={this.state.apiResponse}
              savedTrees={this.state.savedTrees}
            ></CardResponses>
          ) : (
            <CardWrapper>{this.renderCards()}</CardWrapper>
          )}
        </div>
      </div>
    );
  }
}
