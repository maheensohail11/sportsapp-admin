import React, {useState, useEffect} from 'react';
import firebaseDb from '../firebase';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function CricScorer (props) {

    var deciding_team;
    var other_team;
    if(props.match.params.team_A === props.match.params.tosswinteam){
        deciding_team= props.match.params.team_A
        other_team= props.match.params.team_B
    }
    else{
        deciding_team= props.match.params.team_B
        other_team= props.match.params.team_A
    } 
    var batting_team= (props.match.params.choice === "bat" )? deciding_team : other_team;
    var fielding_team= (batting_team === deciding_team)? other_team : deciding_team;

    var current_over= []; 
    var runs_per_over = 0;
    var total_runs_1st_innings = 0;
    const onRuns= e =>{
        current_over.push(e.target.value);
        runs_per_over += parseInt(e.target.value, 10);
        console.log(current_over);
    }
    const nextOver= () => {
        console.log("runs this over:", runs_per_over);
        total_runs_1st_innings += runs_per_over;
        firebaseDb.firestore().collection("events").doc(props.match.params.eventname).collection("ongoing_matches").doc(props.match.params.matchname).update(
            {runs_this_over: runs_per_over, total_runs_1st_innings: total_runs_1st_innings });
        runs_per_over= 0;    
    }   

    return(
        <>
          <h2> Batting team: {batting_team}</h2>
          <h2> Fielding Team: {fielding_team}</h2> 

          <div className="keyboardRow roundBorder" >
          <button onClick={e => onRuns(e, "value")} value="1"> 1 </button> 
          <button onClick={e => onRuns(e, "value")} value="2"> 2 </button>
          <button onClick={e => onRuns(e, "value")} value="3"> 3 </button>
          <button onClick={e => onRuns(e, "value")} value="4"> 4 </button>
          <button onClick={e => onRuns(e, "value")} value="6"> 6 </button>
          <button onClick={e => onRuns(e, "value")} value="1 wd"> Wide </button>
          <button onClick={e => onRuns(e, "value")} value="1 nb"> No Ball </button>
          <button> Out </button>
          <button onClick= {nextOver}>Next Over</button>
        </div>


        </>
    )
}

export default CricScorer;