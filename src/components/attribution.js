import React from "react";
import FoursquareLogo from '../style/powered-by-foursquare-grey.png';

class Attribution extends React.Component {
  render() {
    return (
      <div className="col-md-6">
        <img
          className="attribution"
          src={FoursquareLogo}
        />
      </div>
    );
  }
}
export default Attribution;
