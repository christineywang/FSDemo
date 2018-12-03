import React from "react";

const VenueListItem = ({ venue, onVenueSelect }) => {
  const photoUrl = venue.photo
    ? `${venue.photo.prefix}200x200${venue.photo.suffix}`
    : "https://source.unsplash.com/random/200x200";
  const venueUrl = `https://foursquare.com/v/${venue.venue.id}`;
  const venueAddress = venue.venue.location.formattedAddress[0];
  const rating = venue.venue.rating;
  return (
    <li onClick={() => onVenueSelect(venue)} className="list-group-item">
      <div className="venue-list media">
        <div className="media-left">
          <img className="media-object" src={photoUrl} />
        </div>
        <div className="media-body">
          <div className="media-heading">
            <a href={venueUrl} target="_blank">
              {venue.venue.name}
            </a>
          </div>
          <div>{venueAddress}</div>
          <div className="rating">{rating}</div>
        </div>
      </div>
    </li>
  );
};

export default VenueListItem;
