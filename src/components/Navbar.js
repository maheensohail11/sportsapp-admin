import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {BrowserRouter as Router, Route} from "react-router-dom";

class Landing extends Component {
   

    render() {
        const mystyle = {
            color: "gray",
            padding: "0px",
            fontFamily: "Impact",
            fontSize: 35
          
          }
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                <a href="/feedform" className="navbar-brand" style={mystyle}>SPORTIFY</a>
                </li>
                <li className="nav-item">
                <a href="/feedform" className="nav-link">
                        Add to NewsFeed
            </a>
                </li>

                <li className="nav-item">
                <a href="/eventform" className="nav-link">
                        Add an Event
            </a>
                </li>

                <li className="nav-item">
                <a href="/events" className="nav-link">
                        Events
            </a>
                </li>

                <li className="nav-item">
                <a href="/teamform" className="nav-link">
                        Add a Team
            </a>
                </li>
                <li className="nav-item">
                <a href="/scoringpage" className="nav-link">
                        Scoring
            </a>
                </li>

                               
               </ul>
        )

        
        
        return (
            <Router>
                <div>
            <nav className="navbar navbar-expand-xl">
               
   
         
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample10"
                    aria-controls="navbarsExample10"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse justify-content-end"
                    id="navbarsExample10">
                    
                    {loginRegLink}
                </div>
                
           
        
            </nav>
            </div>
            </Router>
        )
    }
}

export default withRouter(Landing)
        
