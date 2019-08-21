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
      polygonsList: []
    };
  }

  resetSelection = () => {
    this.setState({ polygonsList: [] });
  };

  setSearchable = () => {
    this.setState({ isSearching: true });
  };

  fetchData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        // create an array of contacts only with relevant data
        const newContacts = response.data.map(c => {
          return {
            id: c.id,
            name: c.name
          };
        });

        // create a new "State" object without mutating
        // the original State object.
        const newState = Object.assign({}, this.state, {
          contacts: newContacts
        });

        // store the new state object in the component's state
        this.setState(newState);
      })
      .catch(error => console.log(error));
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
              {this.state.polygonsList.map(polygon => (
                <Rectangle {...polygon} />
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
            onClick={this.setSearchable}
            disabled={!this.state.polygonsList.length || this.state.isSearching}
          >
            Submit
          </Button>
        </React.Fragment>
        {this.fetchData() || "plumbus"}
      </div>
    );
  }
}
