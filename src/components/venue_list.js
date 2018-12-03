import React from "react";
import VenueListItem from "./venue_list_item";

const VenueList = props => {
  const venueItems = props.venues.map(venue => {
    return (
      <VenueListItem
        key={venue.id}
        venue={venue}
        onVenueSelect={props.onVenueSelect}
      />
    );
  });
  return <ul className="col-md-6 list-group">{venueItems}</ul>;
};

export default VenueList;
