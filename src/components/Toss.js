import React, {useState, useEffect} from 'react';
import firebaseDb from '../firebase';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Toss (props) {

    const initialvalues= {
        tosswinteam: "",
        choice:"",
        }
    var [values, setValues]= useState(initialvalues);
    var history= useHistory();
    var [MatchData, setMatchData]= useState({});
    var eventname= props.match.params.eventname;
    var matchname= props.match.params.matchname;
    
    var eventsRef= firebaseDb.firestore().collection("events").doc(eventname).collection("upcoming_matches")
     eventsRef.doc(matchname).get().then((doc) => {
         setMatchData(doc.data());
          })
    const handleInputChange = e => {
        var {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
       
    }      

    const beginMatch= (props) => {
        //move match from upcoming to ongoing collection
        firebaseDb.firestore().collection("events").doc(eventname).collection("ongoing_matches").doc(matchname).set(MatchData);
       // eventsRef.doc(matchname).delete();
        //start match
        history.push(`/cricscorer/${eventname}/${matchname}/${MatchData.team_A}/${MatchData.team_B}/${values.tosswinteam}/${values.choice}`);  
    }

    return(
        <>
        <h1>{eventname}</h1>
        <h2>Toss Details</h2>
        <p> Team <select placeholder="Team A Name" name="tosswinteam" onChange={handleInputChange} value={values.tosswinteam}>
        <option value="" disabled selected>Select Team</option>
            <option value= {MatchData.team_A}>{MatchData.team_A} </option>
            <option value= {MatchData.team_B}>{MatchData.team_B} </option>
            </select> 
            won the toss, and chose to 
            {<select placeholder="Team A Name" name="choice" onChange={handleInputChange} value={values.choice}>
            <option value="" disabled selected>Select their Choice</option>
            <option value= "bat">Bat </option>
            <option value= "field">Field</option>
            </select>} first</p>
        <button type= "primary" onClick= {beginMatch}> Lets Begin! </button>  
        </>
    )
}

export default Toss;