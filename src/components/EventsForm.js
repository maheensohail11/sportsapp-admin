import React, {useState, useEffect} from 'react';
import firebaseDb from '../firebase';
import {storageRef} from '../firebase'; 



const EventsForm = () => {
    const initialEventvalues= {
        name: "",
        cover_image: "",
        game: "",
        start_date: ""
        
    }

var [values, setValues]= useState(initialEventvalues);   
var [Image, setImage] = useState(null); 

const handleInputChange = e => {
    var {name, value} = e.target
    setValues({
        ...values,
        [name]: value
    })
   console.log(`${name} is: ${e.target.value}`);
}

const handleImageChange = e =>{
    console.log("file: " , e.target.files[0]);
    if(e.target.files[0]){
    setImage(e.target.files[0]);
    }
    else{
    console.log("No image")};

}  

const handleOnSubmit = e => {
    console.log("in handle submit..")
    e.preventDefault();
    addEvent(values);
}

const addEvent = obj => {
    console.log("in add event..");
    if(obj.name === ""){alert("Event Name field cannot be empty")}
   else{
   const feedsRef = firebaseDb.firestore().collection('events')
   feedsRef.doc(obj.name).set(obj, err => {
    if(err)
    console.log(err)
})
}
}
const handleUpload = () => {
    
    const uploadImage= storageRef.ref(`eventsimages/${Image.name}`).put(Image);
    uploadImage.on(
        "state_changed",
        snapshot => {},
        error => {
            console.log(error);
        },
        () => {
            storageRef
            .ref("eventsimages")
            .child(Image.name)
            .getDownloadURL()
            .then(url => {
                console.log(url);
                setValues({
                    ...values,
                    cover_image: url
                })
            })
        } 
    )
    }

 
    return(
    <form autoComplete="off" onSubmit= {handleOnSubmit}>
        <div className= "form-group input-group">
           <input className="form-control" placeholder="Event Name" name="name"
            value={values.name}
            onChange= {handleInputChange}
            />

        </div>
        <div className= "form-row">
        <div className= "form-group input-group col-md-6">
            <input type= "file" className="form-control" placeholder="Cover Image" name="cover_image"
            onChange= {handleImageChange}
            />
            <button type="button" onClick= {handleUpload}>Upload </button> 

        </div>
        <div className= "form-group input-group col-md-6">
        
          <select placeholder="Choose Game" onChange={handleInputChange} name= "game" value={values.game}>
            <option value="cricket">Cricket</option>
            <option value="football">Football</option>
            
          </select>
        </div>
        <div className= "form-group input-group">
           <input className="form-control" placeholder="Start Date" name="start_date"
            value={values.start_date}
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
    

export default EventsForm;