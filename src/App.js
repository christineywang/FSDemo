import React, { Component } from "react";
import SearchBar from "./components/search_bar";
import VenueList from "./components/venue_list";
import VenueDetail from "./components/venue_detail";
import Map from "./components/map";
import Attribution from "./components/attribution";

import './App.css';

// https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

const foursquare = require("react-foursquare")({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET // is this safe to expose into the browser?
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
      ).catch(err => console.log(err));
      
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

