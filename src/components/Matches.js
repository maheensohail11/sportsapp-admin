import React, {useState, useEffect} from 'react';
import firebaseDb from '../firebase';
import Button from 'react-bootstrap/Button';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, CardImg} from 'reactstrap';


const Matches = (props) => {
  
   const [Matches, setMatches]= useState([]);
    useEffect(() => {
      const eventsRef= firebaseDb.firestore().collection("events")
     eventsRef.doc(props.match.params.eventname).collection('upcoming_matches').get().then((querySnapshot) => {
           setMatches(querySnapshot.docs)
          });
    }, [])

     return(
        <>
       
      
<h1> Upcoming Matches</h1>

        {Matches.map( (item, index) =>{
            return(
              <div>
                <Card style={{ width: '18rem', display: 'inline-block' }}>
                <CardBody>
                    <CardTitle>{item._delegate._document.data.partialValue.mapValue.fields.name.stringValue}</CardTitle>
                    <CardText>Match Date: {item._delegate._document.data.partialValue.mapValue.fields.date.stringValue}</CardText>
                    <CardText>Match Time: {item._delegate._document.data.partialValue.mapValue.fields.time.stringValue}</CardText>
                </CardBody>
                </Card>                         
              </div>
                 )
            })}
            
            </>
         )}

export default Matches;