import React, {useState, useEffect} from 'react';
import firebaseDb from '../firebase';
import {storageRef} from '../firebase'; 

const FeedForm = () => {
    const initialFeedvalues= {
        title: "",
        image: "",
        content: ""
    }

var [values, setValues]= useState(initialFeedvalues);   
var [Image, setImage] = useState(null); 

const handleInputChange = e => {
    var {name, value} = e.target
    setValues({
        ...values,
        [name]: value
    })
   
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
    addFeed(values);
}

const addFeed = obj => {
    console.log("in add feeds..");
   const feedsRef = firebaseDb.firestore().collection('feeds')
   feedsRef.doc(obj.title).set(obj, err => {
       if(err)
    console.log(err)
})
}

const handleUpload = () => {
    
    const uploadImage= storageRef.ref(`feedsimages/${Image.name}`).put(Image);
    uploadImage.on(
        "state_changed",
        snapshot => {},
        error => {
            console.log(error);
        },
        () => {
            storageRef
            .ref("feedsimages")
            .child(Image.name)
            .getDownloadURL()
            .then(url => {
                console.log(url);
                setValues({
                    ...values,
                    image: url
                })
            })
        } 
    )
    }

 
    return(
    <form autoComplete="off" onSubmit= {handleOnSubmit }>
        <div className= "form-group input-group">
           <input className="form-control" placeholder="Title" name="title"
            value={values.title}
            onChange= {handleInputChange}
            />

        </div>
        <div className= "form-row">
        <div className= "form-group input-group col-md-6">
            <input type= "file" className="form-control" placeholder="Image" name="image"
            onChange= {handleImageChange}
            />
            <button type="button" onClick= {handleUpload}>Upload </button> 

        </div>
        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Content" name="content"
            value={values.content}
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
    
    export default FeedForm;