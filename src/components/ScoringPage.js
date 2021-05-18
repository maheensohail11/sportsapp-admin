import React, {useState, useEffect} from 'react';
import firebaseDb from '../firebase';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const ScoringPage = () => {

    let history = useHistory();
    const initialvalues= {
        eventname: "",
        match:"",
        }

var [values, setValues]= useState(initialvalues);
const [Matches, setMatches]= useState([]);

    const handleEventInputChange = e => {
        var {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
        firebaseDb.firestore().collection("events").doc(value).collection('upcoming_matches').get().then((querySnapshot) => {
            setMatches(querySnapshot.docs)
            });
      
    }

    const handleMatchInputChange = e => {
        var {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
       
    }

    function handleOnSubmit(prop) {
    history.push(`/tosspage/${values.eventname}/${values.match}`);
        
    }

    const [Events, setEvents]= useState([]);
    useEffect(() => {
      firebaseDb.firestore().collection("events").get().then((querySnapshot) => {
        setEvents(querySnapshot.docs)
        });
    }, [])

    return(
        <>
        <form autoComplete="off" >

        <div className= "form-group input-group">
            <label>  Event:      </label>
            <select name="eventname" onChange={handleEventInputChange} value={values.eventname}>
            <option value="" disabled selected>Select Event</option>
            {Events.map((item)=>{
                return(
                    <option value={item.data().name}>{item.data().name}</option> 
                    )})
            }
            </select>
        </div> 
            <br />
        <div className= "form-group input-group ">
            <label> Match: </label>
            <select name="match" onChange={handleMatchInputChange} value={values.match}>
            <option value="" disabled selected>Select Match</option>
            {Matches.map((item)=>{
                return(
                    <option value={item.data().name}>{item.data().name}</option> 
                    )})
            }
            </select>
        </div>
        <div className= "form-group">
            <button type="primary" onClick={handleOnSubmit}> Start Match </button> 

        </div> 
        </form>
        </>
    )


}

export default ScoringPage;