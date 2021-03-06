import React, { Component } from "react";
import "./Homepage.css";
// A simple homepage / landingpage component
class Homepage extends Component {
  state = {};
  render() {
    return (
      <div className="homePage">
        <h3>
          Welcome to Mindful Muscle, the one stop shop to building a new
          exercise routine.
        </h3>
        <p>
          When it comes to building an exercise routine it is difficult to
          decide where to start. You can spend hours scouring the web to find an
          array of varying information that is often incomplete or a one size
          fits all plan.
        </p>
        <p>
          At Mindful Muscle we take out all the guess-work! simply create a
          user, choose your goals, choose how often you want to workout and
          choose what resources you have available. Once you have made these
          selections, your dashboard will display a custom workout.
        </p>
      </div>
    );
  }
}

export default Homepage;
