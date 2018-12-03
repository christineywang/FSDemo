import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search_bar";
import VenueList from "./components/venue_list";
import VenueDetail from "./components/venue_detail";
import Map from "./components/map";
import Attribution from "./components/attribution";

import './App.css';

const CLIENT_ID = "TSQSZARZBQHF00L4C2ILSDCZETKWHT41ZXOKRJNJ3TN0N0BT";
const CLIENT_SECRET = "ODFB344IIV311HQBFHLNYZSHIVBAEGNU5K2YGQ3LLBJYQNLM";

const foursquare = require("react-foursquare")({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      selectedVenue: undefined
    };
    this.venueSearch("coffee");
  }

  venueSearch(query) {
    foursquare.venues
      .recommendations({
        ll: "37.7749,-122.4194",
        query: query,
        limit: 10
      })
      .then(res =>
        res.response.group.results.sort(
          (a, b) => b.venue.rating - a.venue.rating
        )
      )
      .then(venues =>
        this.setState({
          selectedVenue: null,
          venues: venues
        })
      );
  }

  render() {
    return (
      <div>
        <div className="intro-text">Find me the best...</div>
        <SearchBar onSearchQueryChange={query => this.venueSearch(query)} />
        <Map
          coordinates={this.state.venues}
          selectedVenue={this.state.selectedVenue}
        />
        <VenueList
          onVenueSelect={venue => this.setState({ selectedVenue: venue.id })}
          venues={this.state.venues}
        />
      </div>
    );
  }
}

export default App;

