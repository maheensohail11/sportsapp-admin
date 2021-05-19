//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import FeedForm from './components/FeedForm';
import EventsForm from './components/EventsForm';
import Events from './components/Events';
import TeamForm from './components/TeamForm';
import Navbar from './components/Navbar';
import MatchForm from './components/MatchForm';
import Matches from './components/Matches';
import ScoringPage from './components/ScoringPage';
import CricScorer from './components/CricScorer';
import Toss from './components/Toss';
import GameScheduleForm from './components/GameScheduleForm';
import CricSecondInnings from './components/CricSecondInnings';


function App() {
  return (
    <Router>
    <div className="App">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
         <Navbar />
          </nav>
          
            <Route exact path="/feedform" component={FeedForm} />
            <Route exact path="/schedform" component={GameScheduleForm} />
            <Route exact path="/eventform" component={EventsForm} />
            <Route exact path="/teamform" component={TeamForm} />
            <Route exact path="/events" component={Events} />
            <Route path="/addmatches/:eventname" component={MatchForm} />
            <Route path="/showmatches/:eventname" component={Matches} />
            <Route path="/tosspage/:eventname/:matchname" component={Toss} />
            <Route path="/cricscorer/:eventname/:matchname/:team_A/:team_B/:tosswinteam/:choice" component={CricScorer} />
            <Route path="/secondinnings/:eventname/:matchname/:battingteam/:fieldingteam" component={CricSecondInnings} />
            <Route exact path="/scoringpage" component={ScoringPage} />
           
        </div>
    
    </Router>
  );
}

export default App;
