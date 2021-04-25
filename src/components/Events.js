import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import firebaseDb from '../firebase';
import {storageRef} from '../firebase'; 
//import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MatchForm from '../components/MatchForm'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, CardImg} from 'reactstrap';


const Events = () => {
  
  let history = useHistory();
 const [Events, setEvents]= useState([]);
    useEffect(() => {
      firebaseDb.firestore().collection("events").get().then((querySnapshot) => {
           setEvents(querySnapshot.docs)
          });
    }, [])

   /*querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
});*/

const showmatchesbutton = prop => {
    history.push(`/showmatches/${prop}`)
  }

const buttonClick = prop => {
   history.push(`/addmatches/${prop}`)
 }
  
    return(
        <>
       
      
<h1> Events</h1>

        {Events.map( (item, index) =>{
            return(
              <div>
                <Card style={{ width: '18rem', display: 'inline-block' }}>
                <CardImg style={{width:'18rem' , height: '8rem'}} variant="top" src={item._delegate._document.data.partialValue.mapValue.fields.cover_image.stringValue}/>
                <CardBody>
                    <CardTitle>{item._delegate._document.data.partialValue.mapValue.fields.name.stringValue}</CardTitle>
                    <CardText>{item._delegate._document.data.partialValue.mapValue.fields.start_date.stringValue}</CardText>
                    <Button variant="primary" onClick={buttonClick.bind(this, item._delegate._document.data.partialValue.mapValue.fields.name.stringValue)} >Add Matches  </Button>
                    <Button variant="primary" onClick={showmatchesbutton.bind(this, item._delegate._document.data.partialValue.mapValue.fields.name.stringValue)} >Show details  </Button>
                </CardBody>
                </Card>                         
              </div>
                 )
            })}
            
            </>
         )}

export default Events;