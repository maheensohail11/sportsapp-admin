import React, {useState, useEffect, Component} from 'react';
import firebaseDb from '../firebase';
import {storageRef} from '../firebase'; 



class TeamForm extends Component  {

    constructor(props){
        super();
    this.state = {
        team_name: "",
        Player_1_name: "", Player_1_id: "",
        Player_2_name: "", Player_2_id: "",
        Player_3_name: "", Player_3_id: "",
        Player_4_name: "", Player_4_id: "",
        Player_5_name: "", Player_5_id: "",
        Player_6_name: "", Player_6_id: "",
        Player_7_name: "", Player_7_id: "",
        Player_8_name: "", Player_8_id: "",
        Player_9_name: "", Player_9_id: "",
        Player_10_name: "", Player_10_id: "",
        Player_11_name: "", Player_11_id: "",
                }
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handlePlayerSave = this.handlePlayerSave.bind(this);
    this.addTeam = this.addTeam.bind(this);
    }
    
handlePlayerSave = prop => {
   
    console.log("PL_ID: ", prop.Pl_id )
    const playersRef = firebaseDb.firestore().collection('cric_players')
    playersRef.doc(prop.Pl_id).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            alert("Player with this id exists already. Try changing id");
          } else {
            playersRef.doc(prop.Pl_id).set(prop, err => {
                if(err)
                console.log(err)
            }) 
          }
        })
}
    
handleInputChange  = e => {
        
       var {name, value} = e.target
       this.setState({
          [name]: value
       })
    }   
   
handleOnSubmit = e => {
    console.log("in handle submit..")
    const values= this.state;
    e.preventDefault();
    this.addTeam(values);
}

 addTeam = obj => {
    console.log("in add team..");
    if(obj.team_name === ""){alert("Team Name field cannot be empty")}
   else{const feedsRef = firebaseDb.firestore().collection('teams')
   feedsRef.doc(obj.team_name).set(obj, err => {
    if(err)
    console.log(err)
})

    alert("Team added successfully");
   this.setState({
    team_name: "",
        Player_1_name: "", Player_1_id: "",
        Player_2_name: "", Player_2_id: "",
        Player_3_name: "", Player_3_id: "",
        Player_4_name: "", Player_4_id: "",
        Player_5_name: "", Player_5_id: "",
        Player_6_name: "", Player_6_id: "",
        Player_7_name: "", Player_7_id: "",
        Player_8_name: "", Player_8_id: "",
        Player_9_name: "", Player_9_id: "",
        Player_10_name: "", Player_10_id: "",
        Player_11_name: "", Player_11_id: "",
    
   })
}
}
render(){

    return(
    <form autoComplete="off" onSubmit= {this.handleOnSubmit}>
        <div className= "form-group input-group">
           <input className="form-control" placeholder="Team Name"  name="team_name"
            value={this.state.team_name}
            onChange= {this.handleInputChange}
            />

        </div>
        <div className= "form-row">
        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Player 1 Name" name="Player_1_name"
                value={this.state.Player_1_name}
                onChange= {this.handleInputChange}
                />

        </div>
        <div className= "form-group input-group col-md-6">
        
            <input className="form-control" placeholder="Player 1 ERP" name="Player_1_id"
                value={this.state.Player_1_id}
                onChange= {this.handleInputChange}
                />
        </div>
        <button type="button" onClick= {this.handlePlayerSave.bind(this, {Pl_name: this.state.Player_1_name, Pl_id: this.state.Player_1_id})}>Save Player </button> 
        </div>

        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Player 2 Name" name="Player_2_name"
                value={this.state.Player_2_name}
                onChange= {this.handleInputChange}
                />

        </div>

        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Player 2 ERP" name="Player_2_id"
                value={this.state.Player_2_id}
                onChange= {this.handleInputChange}
                />

        </div>
        <button type="button" onClick= {this.handlePlayerSave.bind(this, {Pl_name: this.state.Player_2_name, Pl_id: this.state.Player_2_id})}>Save Player </button> 


        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Player 3 Name" name="Player_3_name"
                value={this.state.Player_3_name}
                onChange= {this.handleInputChange}
                />

        </div>

        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Player 3 ERP" name="Player_3_id"
                value={this.state.Player_3_id}
                onChange= {this.handleInputChange}
                />

        </div>
        <button type="button" onClick= {this.handlePlayerSave.bind(this, {Pl_name: this.state.Player_3_name, Pl_id: this.state.Player_3_id})}>Save Player </button> 


        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Player 4 Name" name="Player_4_name"
                value={this.state.Player_4_name}
                onChange= {this.handleInputChange}
                />

        </div>

        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Player 4 ERP" name="Player_4_id"
                value={this.state.Player_4_id}
                onChange= {this.handleInputChange}
                />

        </div>
        <button type="button" onClick= {this.handlePlayerSave.bind(this, {Pl_name: this.state.Player_4_name, Pl_id: this.state.Player_4_id})}>Save Player </button> 


        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Player 5 Name" name="Player_5_name"
                value={this.state.Player_5_name}
                onChange= {this.handleInputChange}
                />

        </div>

        <div className= "form-group input-group col-md-6">
            <input className="form-control" placeholder="Player 5 ERP" name="Player_5_id"
                value={this.state.Player_5_id}
                onChange= {this.handleInputChange}
                />

        </div>
        <button type="button" onClick= {this.handlePlayerSave.bind(this, {Pl_name: this.state.Player_5_name, Pl_id: this.state.Player_5_id})}>Save Player </button> 

        <div className= "form-group">
            <input type="submit" value="Save" className="btn btn-primary btn-block" />

        </div>
    </form>
    );
    
    }
}
    

export default TeamForm;