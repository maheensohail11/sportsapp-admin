import { render } from '@testing-library/react';
import React, {useState, useEffect} from 'react';
import firebaseDb from '../firebase';
import {storageRef} from '../firebase'; 



function MatchForm(props) {
    const initialMatchvalues= {
        name: "",
        team_A:"",
        team_B: "",
        date: "",
        time: ""
       
        
    }

var [values, setValues]= useState(initialMatchvalues);   

const handleInputChange = e => {
    var {name, value} = e.target
    setValues({
        ...values,
        [name]: value
    })
  
}

const handleOnSubmit = e => {
    console.log("in handle submit..")
    e.preventDefault();
    addMatch(values);
}

const addMatch = obj => {
    console.log("in add match..");
    const eventsRef = firebaseDb.firestore().collection('events')
   eventsRef.doc(props.match.params.eventname).collection('upcoming_matches').doc(obj.name).set(obj, err => {
    if(err)
    console.log(err)
})
}
    
var [Teamnames, setTeamnames] = useState([]); 
     useEffect(() => {
        firebaseDb.firestore().collection("teams").get().then((querySnapshot) => {
            setTeamnames(querySnapshot.docs)
             });
       }, [])

return(
        <>
 
   <form autoComplete="off" onSubmit= {handleOnSubmit}>

        <div className= "form-group input-group">
           <input className="form-control" placeholder="Match Name" name="name"
            value={values.name}
            onChange= {handleInputChange}
            />
        </div>
        
        <div className= "form-group input-group col-md-6">
            <label> Team A:      </label>
            <select placeholder="Team A Name" name="team_A" onChange={handleInputChange} value={values.team_A}>
            <option value="" disabled selected>Select Team A</option>
            {Teamnames.map((item)=>{
                return(
                    <option value={item.data().team_name}>{item.data().team_name}</option> 
                    )})
            }
            </select>
        </div>  
        <br />
        <div className= "form-group input-group col-md-6">
            <label> Team B:      </label>
            <select placeholder="Team B Name" name="team_B" onChange={handleInputChange} value={values.team_B}>
            <option value="" disabled selected>Select Team B</option>
            {Teamnames.map((item)=>{
                return(
                    <option value={item.data().team_name}>{item.data().team_name}</option> 
                    )})
            }
            </select>
        </div>
        
               
        <div className= "form-group input-group">
           <input className="form-control" placeholder="Match Date" name="date"
            value={values.date}
            onChange= {handleInputChange}
            />

        </div>
        <div className= "form-group input-group">
           <input className="form-control" placeholder="Match Time" name="time"
            value={values.time}
            onChange= {handleInputChange}
            />

        </div>
        
        <div className= "form-group">
            <input type="submit" value="Save" className="btn btn-primary btn-block" />

        </div>
    </form>
    
    </>
    );
    
    }
    

export default MatchForm;