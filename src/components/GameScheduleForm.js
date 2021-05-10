import React, {useState, useEffect} from 'react';
import firebaseDb from '../firebase';
import {storageRef} from '../firebase'; 

const GameScheduleForm = () => {
    const initialschedvalues= {
        name: "",
        boysdays: "",
        boystimings: "",
        girlsdays:"",
        girlstimings:""
    }

var [values, setValues]= useState(initialschedvalues);   
 

const handleInputChange = e => {
    var {name, value} = e.target
    setValues({
        ...values,
        [name]: value
    })
   
}
const handleOnSubmit = e => {
    e.preventDefault();
    addSched(values);
}

const addSched = obj => {
   const SchedRef = firebaseDb.firestore().collection('game_schedules')
   SchedRef.doc(obj.name).set(obj, err => {
       if(err)
    console.log(err)
})
}

    return(
    <form autoComplete="off" onSubmit= {handleOnSubmit }>
        <div className= "form-group input-group">
           <input className="form-control" placeholder="Game Name" name="name"
            value={values.name}
            onChange= {handleInputChange}
            />

        </div>
        <div className= "form-row">
       
        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Days for Boys" name="boysdays"
            value={values.boysdays}
            onChange= {handleInputChange}
            />
        </div>
        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Timings for Boys" name="boystimings"
            value={values.boystimings}
            onChange= {handleInputChange}
            />
        </div>
        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Days for Girls" name="girlsdays"
            value={values.girlsdays}
            onChange= {handleInputChange}
            />
        </div>
        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Timings for Girls" name="girlstimings"
            value={values.girlstimings}
            onChange= {handleInputChange}
            />

        </div>
        </div>
        <div className= "form-group">
            <input type="submit" value="Save" className="btn btn-primary btn-block" />

        </div>
    </form>
    );
    
    }
    
    export default GameScheduleForm;