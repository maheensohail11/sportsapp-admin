import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import firebaseDb from '../firebase';
import {storageRef} from '../firebase'; 
//import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MatchForm from '../components/MatchForm'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, CardImg} from 'reactstrap';


const EndingPage  = () => {
 
  return(
        <>
      <h1>The game has ended. </h1>
            
            </>
         )}

export default EndingPage;