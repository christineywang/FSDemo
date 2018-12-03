import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import Attribution from "./attribution";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiY3dhbmcyNDIyIiwiYSI6ImNqa3d4Z2F2cjAycG4zdXBnZTZid2J2bmMifQ.BFrd_zsyMxGq6zTyiPMH2A"
});

// Create a feature and popup component for each venue
const Map = props => {
  const features = [];
  const popups = [];
  let center = [-122.4194, 37.7749];
  // console.log(props);
  const coord = props.coordinates.forEach(coordinate => {
    const lng = coordinate.venue.location.lng;
    // console.log(props.selectedVenue);
    const lat = coordinate.venue.location.lat;
    const id = coordinate.id;
    const venueName = coordinate.venue.name;
    const url = () => window.open(coordinate.venue.url);
    features.push(<Feature key={id} coordinates={[lng, lat]} />);
    popups.push(
      <Popup
        key={id}
        coordinates={[lng, lat]}
        anchor="bottom"
        className={props.selectedVenue == id ? "selected-popup" : "popup"}
        onClick={url}
      >
        <p>{venueName}</p>
      </Popup>
    );
    if (coordinate.id == props.selectedVenue) {
      center = [coordinate.venue.location.lng, coordinate.venue.location.lat];
    }
  });

  return (
    <div className="col-md-6">
      <Mapbox
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{
          height: "400px",
          width: "100%"
        }}
        center={center}
        zoom={[15]}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          {features}
        </Layer>
        {popups}
      </Mapbox>
      <Attribution />
    </div>
  );
};

export default Map;
