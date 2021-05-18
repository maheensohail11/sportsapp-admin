import React, {useState, useEffect} from 'react';
import firebaseDb from '../firebase';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

var onstrike_runs=0;
var onstrike_fours=0;
var onstrike_sixes=0;
var other_runs=0;
var other_fours=0;
var other_sixes=0;
var runs_per_over = 0;
var total_runs_1st_innings = 0;
var current_over= []; 
var extra_runs= 0;
var wickets=0;
var current_overs=0.0;
var bowler_runs=0;
var bowler_wickets=0;

function useAsyncState(initialValue) {
    const [value, setValue] = useState(initialValue);
    const setter = x =>
      new Promise(resolve => {
        setValue(x);
        resolve(x);
      });
    return [value, setter];
  }


function CricScorer (props) {
    const initialvalues= {
        b_onstrike_id: "",
        b_onstrike_name: "",
        b_other_id: "",
            bowler_id: "",
        bowler_name: ""
        }

    const initialoutvalues={
        player_out_name: "",
        new_player_name:"",
        new_player_id: ""
    } 
    var [values, setValues]= useAsyncState(initialvalues); 
    const [open, setopen]= useState(false);
    var [outvalues, setoutvalues]= useState(initialoutvalues);
    var [battingteamdata, setbattingteamdata]= useState({});
    var [fieldingteamdata, setfieldingteamdata]= useState({});
    const matchref= firebaseDb.firestore().collection("events").doc(props.match.params.eventname).collection("ongoing_matches").doc(props.match.params.matchname);
    var deciding_team;
    var other_team;
    if(props.match.params.team_A === props.match.params.tosswinteam){
        deciding_team= props.match.params.team_A
        other_team= props.match.params.team_B
    }
    else{
        deciding_team= props.match.params.team_B
        other_team= props.match.params.team_A
    } 
    var batting_team= (props.match.params.choice === "bat" )? deciding_team : other_team;
    var fielding_team= (batting_team === deciding_team)? other_team : deciding_team;
    
    useEffect(()=>{
    firebaseDb.firestore().collection("teams").doc(batting_team).get().then((doc) => {
        setbattingteamdata( doc.data());
       // console.log(battingteamdata);
    })
    firebaseDb.firestore().collection("teams").doc(fielding_team).get().then((doc) => {
        setfieldingteamdata( doc.data());
    })
    
    //battingteamdata.Player_2_id,battingteamdata.Player_3_id,battingteamdata.Player_4_id,battingteamdata.Player_5_id );

    
    matchref.update({first_innings_batting_team: batting_team, second_innings_batting_team: fielding_team, total_runs_1st_innings: 0, first_i_overs: 0.0, first_i_wickets: 0});
    },[])

    

    const EndInnings = () =>{
      var idarray= [battingteamdata.Player_1_name,battingteamdata.Player_2_name,battingteamdata.Player_3_name,battingteamdata.Player_4_name,battingteamdata.Player_5_name];
      idarray.map((item, index)=>{
        return( console.log("item",item))
      })
      idarray.forEach((item, index)=>{
        
        firebaseDb.firestore().collection("cric_players").doc(item).get().then((doc)=>{
         var pl_data= doc.data();
         //return( console.log("pldata",pl_data))
         firebaseDb.firestore().collection("cric_players").doc(item).update({matches_played: pl_data.matches_played+1})
         matchref.collection("1st_innings_batsmen").doc(item).get().then((newdoc)=>{
           if(newdoc.exists){
             var newdata= newdoc.data();
            firebaseDb.firestore().collection("cric_players").doc(item).update({pl_runs: pl_data.pl_runs + newdata.runs, fours: pl_data.fours + newdata.fours, sixes : pl_data.sixes + newdata.sixes, innings_played: pl_data.innings_played +1});
           }
            })
      })
    })
  }
    const OnRuns= async e =>{
      if(((current_overs * 10)%10)==5)
      current_overs+=0.5;
      else current_overs+=0.1;

        current_over.push(e.target.value);
        onstrike_runs= onstrike_runs + parseInt(e.target.value, 10);
        if((parseInt(e.target.value, 10) == 1) || (parseInt(e.target.value, 10) == 3) || (parseInt(e.target.value, 10) == 5) ){
            matchref.collection("1st_innings_batsmen").doc(values.b_onstrike_id).update({runs: onstrike_runs});
            matchref.collection("active_batsmen").doc(values.b_onstrike_id).update({runs: onstrike_runs});
            var temp_id= values.b_onstrike_id;
            var temp_name= values.b_onstrike_name;
            var temp_runs= onstrike_runs; 
            onstrike_runs= other_runs;
            other_runs= temp_runs; 
            var temp_fours= onstrike_fours; 
            onstrike_fours= other_fours;
            other_fours= temp_fours; 
            var temp_sixes= onstrike_sixes; 
            onstrike_sixes= other_sixes;
            other_sixes= temp_sixes; 
            await setValues({
                ...values, 
                b_onstrike_id: values.b_other_id,
                b_onstrike_name: values.b_other_name,
                b_other_id: temp_id,
                b_other_name: temp_name
            }).then(console.log("values set in onruns"));
        }
        else if(parseInt(e.target.value, 10)== 4){
          onstrike_fours= onstrike_fours + 1;
            matchref.collection("1st_innings_batsmen").doc(values.b_onstrike_id).update({runs: onstrike_runs, fours: onstrike_fours});
            matchref.collection("active_batsmen").doc(values.b_onstrike_id).update({runs: onstrike_runs,  fours: onstrike_fours});
        }
        else if(parseInt(e.target.value, 10)== 6){
          onstrike_sixes= onstrike_sixes + 1;
          matchref.collection("1st_innings_batsmen").doc(values.b_onstrike_id).update({runs: onstrike_runs, sixes: onstrike_sixes});
          matchref.collection("active_batsmen").doc(values.b_onstrike_id).update({runs: onstrike_runs,  sixes: onstrike_sixes});
      }
        else{
            matchref.collection("1st_innings_batsmen").doc(values.b_onstrike_id).update({runs: onstrike_runs});
            matchref.collection("active_batsmen").doc(values.b_onstrike_id).update({runs: onstrike_runs});
        }
        runs_per_over += parseInt(e.target.value, 10);
        bowler_runs += parseInt(e.target.value, 10);
        total_runs_1st_innings += parseInt(e.target.value, 10);
        matchref.update({runs_this_over: runs_per_over, total_runs_1st_innings: total_runs_1st_innings, first_i_overs: current_overs });
        matchref.collection("1st_innings_bowlers").doc(values.bowler_id).update({runs_given: bowler_runs});
        matchref.collection("active_bowlers").doc(values.bowler_id).update({runs_given: bowler_runs});
        console.log(current_over);
    }

    const nextOver= async () => {
      matchref.collection("active_bowlers").doc(values.bowler_id).delete();
        //player exchange
        var temp_id= values.b_onstrike_id;
        var temp_name= values.b_onstrike_name; 
        var temp_runs= onstrike_runs; 
        onstrike_runs= other_runs;
        other_runs= temp_runs; 
        var temp_fours= onstrike_fours; 
        onstrike_fours= other_fours;
        other_fours= temp_fours; 
        var temp_sixes= onstrike_sixes; 
        onstrike_sixes= other_sixes;
        other_sixes= temp_sixes; 
        await setValues({
            ...values,
            b_onstrike_id: values.b_other_id,
            b_other_id: temp_id,
            b_onstrike_name: values.b_other_name,
            b_other_name: temp_name,
            bowler_id: "",
            bowler_name: "" 
        }).then(console.log("values set in nextover"));
        
        //renew runs per over
        runs_per_over= 0;
        current_over=[]; 
        //popup to change bowler
        setopen(true); 
       } 

    const handleOut= async () => {
      bowler_wickets += 1;
      matchref.collection("1st_innings_bowlers").doc(values.bowler_id).update({wickets: bowler_wickets});
      matchref.collection("active_bowlers").doc(values.bowler_id).update({wickets: bowler_wickets});
      //alert("out values: " + outvalues.player_out_name + " values: " + values.b_onstrike_name);
       if(outvalues.player_out_name === values.b_onstrike_name){
        matchref.collection("active_batsmen").doc(values.b_onstrike_id).delete();
         
           await setValues({
               ...values,
               b_onstrike_id: outvalues.new_player_id,
               b_onstrike_name: outvalues.new_player_name
           }).then(console.log("values set in handleout1"));
           onstrike_runs=0;
           onstrike_fours=0;
           onstrike_sixes=0;
         }
       else{
        matchref.collection("active_batsmen").doc(values.b_other_id).delete();
           await setValues({
               ...values,
               b_other_id: outvalues.new_player_id,
               b_other_name: outvalues.new_player_name
           }).then(console.log("values set in handleout2"));
           other_runs=0;
           other_fours=0;
           other_sixes=0;
    }
      wickets += 1; 
           matchref.collection("1st_innings_batsmen").doc(outvalues.new_player_id).set({name: outvalues.new_player_name, runs: 0, fours: 0, sixes: 0 });
           matchref.collection("active_batsmen").doc(outvalues.new_player_id).set({name: outvalues.new_player_name, runs: 0, fours: 0, sixes: 0 });
           matchref.update({first_i_wickets: wickets}); 
           console.log(JSON.stringify(values));
     }

     const SavePlayers = () => {
       matchref.collection("1st_innings_batsmen").doc(values.b_onstrike_id).set({name: values.b_onstrike_name, runs: 0, sixes: 0, fours: 0 });
       matchref.collection("active_batsmen").doc(values.b_onstrike_id).set({name: values.b_onstrike_name, runs: 0, sixes: 0, fours: 0 });
       matchref.collection("1st_innings_batsmen").doc(values.b_other_id).set({name: values.b_other_name, runs: 0 , sixes: 0, fours: 0 });
       matchref.collection("active_batsmen").doc(values.b_other_id).set({name: values.b_other_name, runs: 0, sixes: 0, fours: 0 });   
        }

    const SaveBowler = () => {
        matchref.collection("1st_innings_bowlers").doc(values.bowler_id).get().then((doc)=>{
          if(doc.exists){
            bowler_runs= doc.data().runs_given;
            bowler_wickets= doc.data().wickets;
            matchref.collection("active_bowlers").doc(values.bowler_id).set({name: values.bowler_name, runs_given: bowler_runs, wickets: bowler_wickets });
          }
          else{
            bowler_runs=0;
            bowler_wickets=0;
            matchref.collection("1st_innings_bowlers").doc(values.bowler_id).set({name: values.bowler_name, runs_given: 0, wickets: 0 });
            matchref.collection("active_bowlers").doc(values.bowler_id).set({name: values.bowler_name, runs_given: 0, wickets: 0 });
          }

        })
        setopen(false);
        
        
    }

    const handleInputChange = async e => {
        var {name, value} = e.target
        var pieces= value.split(";");
        var namepieces= name.split(";");

        await setValues({
            ...values,
            [namepieces[0]]: pieces[0],
            [namepieces[1]]: pieces[1],
        }).then(console.log("values set in handleinputchange"));
      // console.log(JSON.stringify(values));
        
    }
    
    const handleExtras= e =>{
        current_over.push(e.target.value);
        var runs = parseInt(e.target.value, 10);
        runs_per_over += runs;
        total_runs_1st_innings += runs;
        extra_runs += runs ; 
        matchref.update({runs_this_over: runs_per_over, total_runs_1st_innings: total_runs_1st_innings, innings_extras: extra_runs  });
    }

    return(
        <>
          <h2> Batting team: {batting_team}</h2>
          <h2> Fielding Team: {fielding_team}</h2> 

          <label> Choose Batsman: </label> 
          

          <Popup trigger={<button className="button"> Choose Players </button>} modal nested >
      
      <h2>Select Batsman: </h2>
      <select  name="b_onstrike_id;b_onstrike_name"  onChange={handleInputChange} >
      <option value="" disabled selected>Select Player</option>
              <option value={battingteamdata.Player_1_id +";"+ battingteamdata.Player_1_name}>{battingteamdata.Player_1_name}</option>
              <option value={battingteamdata.Player_2_id +";"+ battingteamdata.Player_2_name}>{battingteamdata.Player_2_name}</option>
              <option value={battingteamdata.Player_3_id +";"+ battingteamdata.Player_3_name}>{battingteamdata.Player_3_name}</option>
              <option value={battingteamdata.Player_4_id +";"+ battingteamdata.Player_4_name}>{battingteamdata.Player_4_name}</option>
              <option value={battingteamdata.Player_5_id +";"+ battingteamdata.Player_5_name}>{battingteamdata.Player_5_name}</option>
              <option value={battingteamdata.Player_6_id +";"+ battingteamdata.Player_6_name}>{battingteamdata.Player_6_name}</option>
              <option value={battingteamdata.Player_7_id +";"+ battingteamdata.Player_7_name}>{battingteamdata.Player_7_name}</option>
              <option value={battingteamdata.Player_8_id +";"+ battingteamdata.Player_8_name}>{battingteamdata.Player_8_name}</option>
              <option value={battingteamdata.Player_9_id +";"+ battingteamdata.Player_9_name}>{battingteamdata.Player_9_name}</option>
              <option value={battingteamdata.Player_10_id +";"+ battingteamdata.Player_10_name}>{battingteamdata.Player_10_name}</option>
              <option value={battingteamdata.Player_11_id +";"+ battingteamdata.Player_11_name}>{battingteamdata.Player_11_name}</option>  
             
    </select>
        
    <select name="b_other_id;b_other_name"  onChange={handleInputChange} >
            <option value="" disabled selected>Select Player</option>
              <option value={battingteamdata.Player_1_id +";"+ battingteamdata.Player_1_name}>{battingteamdata.Player_1_name}</option>
              <option value={battingteamdata.Player_2_id +";"+ battingteamdata.Player_2_name}>{battingteamdata.Player_2_name}</option>
              <option value={battingteamdata.Player_3_id +";"+ battingteamdata.Player_3_name}>{battingteamdata.Player_3_name}</option>
              <option value={battingteamdata.Player_4_id +";"+ battingteamdata.Player_4_name}>{battingteamdata.Player_4_name}</option>
              <option value={battingteamdata.Player_5_id +";"+ battingteamdata.Player_5_name}>{battingteamdata.Player_5_name}</option>
              <option value={battingteamdata.Player_6_id +";"+ battingteamdata.Player_6_name}>{battingteamdata.Player_6_name}</option>
              <option value={battingteamdata.Player_7_id +";"+ battingteamdata.Player_7_name}>{battingteamdata.Player_7_name}</option>
              <option value={battingteamdata.Player_8_id +";"+ battingteamdata.Player_8_name}>{battingteamdata.Player_8_name}</option>
              <option value={battingteamdata.Player_9_id +";"+ battingteamdata.Player_9_name}>{battingteamdata.Player_9_name}</option>
              <option value={battingteamdata.Player_10_id +";"+ battingteamdata.Player_10_name}>{battingteamdata.Player_10_name}</option>
              <option value={battingteamdata.Player_11_id +";"+ battingteamdata.Player_11_name}>{battingteamdata.Player_11_name}</option>
    </select>
    
       <button type= "submit" onClick= {SavePlayers}> Save Players</button>
       
   
  </Popup>
  <label> Choose Bowler : </label> 
  <Popup open= {open} modal trigger={<button className="button"> Choose Bowler </button>}>
  <h2>Select Bowler: </h2>
    <select name="bowler_id;bowler_name"  onChange={handleInputChange} >
            <option value="" disabled selected>Select Bowler</option>
              <option value={fieldingteamdata.Player_1_id +";"+fieldingteamdata.Player_1_name} >{fieldingteamdata.Player_1_name}</option>
              <option value={fieldingteamdata.Player_2_id +";"+fieldingteamdata.Player_2_name}>{fieldingteamdata.Player_2_name}</option>
              <option value={fieldingteamdata.Player_3_id +";"+fieldingteamdata.Player_3_name}>{fieldingteamdata.Player_3_name}</option>
              <option value={fieldingteamdata.Player_4_id +";"+fieldingteamdata.Player_4_name}>{fieldingteamdata.Player_4_name}</option>
              <option value={fieldingteamdata.Player_5_id +";"+fieldingteamdata.Player_5_name}>{fieldingteamdata.Player_5_name}</option>
              <option value={fieldingteamdata.Player_6_id +";"+fieldingteamdata.Player_6_name}>{fieldingteamdata.Player_6_name}</option>
              <option value={fieldingteamdata.Player_7_id +";"+fieldingteamdata.Player_7_name}>{fieldingteamdata.Player_7_name}</option>
              <option value={fieldingteamdata.Player_8_id +";"+fieldingteamdata.Player_8_name}>{fieldingteamdata.Player_8_name}</option>
              <option value={fieldingteamdata.Player_9_id +";"+fieldingteamdata.Player_9_name}>{fieldingteamdata.Player_9_name}</option>
              <option value={fieldingteamdata.Player_10_id +";"+fieldingteamdata.Player_10_name}>{fieldingteamdata.Player_10_name}</option>
              <option value={fieldingteamdata.Player_11_id +";"+fieldingteamdata.Player_11_name}>{fieldingteamdata.Player_11_name}</option>
    </select>
       <button type= "submit" onClick= {SaveBowler}> Save Players</button>
  </Popup>
    <br />
    <br />

        <div className="keyboardRow roundBorder" >
          <button onClick={e => OnRuns(e, "value")} value="1"> 1 </button> 
          <button onClick={e => OnRuns(e, "value")} value="2"> 2 </button>
          <button onClick={e => OnRuns(e, "value")} value="3"> 3 </button>
          <button onClick={e => OnRuns(e, "value")} value="4"> 4 </button>
          <button onClick={e => OnRuns(e, "value")} value="6"> 6 </button>
          <button onClick={e => handleExtras(e, "value")} value="1"> Wide </button>
          <button onClick={e => handleExtras(e, "value")} value="1"> No Ball </button>
          
          <Popup trigger={<button className="button" > Out </button>} modal >
            
             <label> Player Out: </label>
              <select  onChange={e => {setoutvalues({...outvalues, player_out_name: e.target.value})}} >
                <option value="" disabled selected>Select Batsman: </option>
                  <option value= {values.b_onstrike_name}>{values.b_onstrike_name}</option>
                  <option value={values.b_other_name}>{values.b_other_name}</option>
              </select>  
    
              <h2>Select New Batsman: </h2>
               <select name="new_player_id;new_player_name" onChange={e => {var pieces= e.target.value.split(";"); setoutvalues({...outvalues, new_player_id: pieces[0], new_player_name: pieces[1]});}} >
                  <option value="" disabled selected>Select Player</option>
                  <option value={battingteamdata.Player_1_id +";"+ battingteamdata.Player_1_name}>{battingteamdata.Player_1_name}</option>
                  <option value={battingteamdata.Player_2_id +";"+ battingteamdata.Player_2_name}>{battingteamdata.Player_2_name}</option>
                  <option value={battingteamdata.Player_3_id +";"+ battingteamdata.Player_3_name}>{battingteamdata.Player_3_name}</option>
                  <option value={battingteamdata.Player_4_id +";"+ battingteamdata.Player_4_name}>{battingteamdata.Player_4_name}</option>
                  <option value={battingteamdata.Player_5_id +";"+ battingteamdata.Player_5_name}>{battingteamdata.Player_5_name}</option>
                  <option value={battingteamdata.Player_6_id +";"+ battingteamdata.Player_6_name}>{battingteamdata.Player_6_name}</option>
                  <option value={battingteamdata.Player_7_id +";"+ battingteamdata.Player_7_name}>{battingteamdata.Player_7_name}</option>
                  <option value={battingteamdata.Player_8_id +";"+ battingteamdata.Player_8_name}>{battingteamdata.Player_8_name}</option>
                  <option value={battingteamdata.Player_9_id +";"+ battingteamdata.Player_9_name}>{battingteamdata.Player_9_name}</option>
                  <option value={battingteamdata.Player_10_id +";"+ battingteamdata.Player_10_name}>{battingteamdata.Player_10_name}</option>
                  <option value={battingteamdata.Player_11_id +";"+ battingteamdata.Player_11_name}>{battingteamdata.Player_11_name}</option>  
                 
                </select>
                <button type="primary" onClick={handleOut} > Save </button>
         </Popup>
    
          <button onClick= {nextOver}>Next Over</button>
          <button onClick= {EndInnings}>End 1st Innings</button>
        </div>

      </>
    )
}

export default CricScorer;