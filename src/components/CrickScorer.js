import React, {useState, useEffect} from 'react';
import firebaseDb from '../firebase';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function CricScorer (props) {

    var eventname= props.match.params.eventname;
    var matchname= props.match.params.matchname;

    return(
        <h1>{eventname}</h1>
        
    )
}

export default CricScorer;