import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import GoogleApiWrapper from "./MapContainer";
import Button from "@material-ui/core/Button";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";

import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  MarkerClusterer,
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
      coordinatePair: {}
    };
  }

  resetSelection = () => {
    this.setState({ polygonsList: [] });
  };

  toggleSearchable = () => {
    this.setState({ isSearching: !this.state.isSearching });
  };

  fetchData = () => {
    this.toggleSearchable();
    console.log(
      `${process.env.REACT_APP_SERVER_ADDRESS}?ne_lat=${
        this.state.coordinatePair.ne.lat
      }&nelng=${this.state.coordinatePair.ne.lng}&swlat=${
        this.state.coordinatePair.sw.lat
      }&swlng=${this.state.coordinatePair.sw.lng}`
    );
    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDRESS}?nelat=${
          this.state.coordinatePair.ne.lat
        }&nelng=${this.state.coordinatePair.ne.lng}&swlat=${
          this.state.coordinatePair.sw.lat
        }&swlng=${this.state.coordinatePair.sw.lng}`
      )
      .then(response => {
        // create an array of contacts only with relevant data

        // create a new "State" object without mutating
        // the original State object.
        const newState = Object.assign({}, this.state, {
          response: response.data
        });

        // store the new state object in the component's state
        // this.setState({ data: newState });
        this.toggleSearchable();
        console.log(newState);
      })
      .catch(error => {
        console.log(error);
        this.toggleSearchable();
      });
  };

  render() {
    return (
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
              zoom={9}
              center={{
                lat: 33.753746,
                lng: -84.38633
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
                  id={ndx}
                  options={{
                    fillColor: "green",
                    fillOpacity: 0.25,
                    strokeColor: "red",
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    clickable: false,
                    draggable: false,
                    editable: true,
                    geodesic: false,
                    zIndex: 1
                  }}
                />
              ))}
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
            disabled={!this.state.polygonsList.length || this.state.isSearching}
          >
            Submit
          </Button>
          {JSON.stringify(this.state.data)}
        </React.Fragment>
      </div>
    );
  }
}
