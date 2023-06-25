import "./Home.css";
import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
function Home() {
  const[name, setName] = useState('');
  const[dob, setDob] = useState('');
  const [race, setRace] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [ height,setHeight] = useState('');
  const [a1c,setA1c] = useState('');
  const [bp,setBp] = useState('');
  const [medicine, setMedicine] = useState('');
  
  const handleSubmit = (event)=>{
    event.preventDefault();

    const dataObj ={
      'name': name,
      'dob' : dob,
      'race' : race, 
      'gender' : gender ,
      'height' : height,
      'weight' : weight,
      'a1c' : a1c,
      'bp':bp,
      'medication': medicine 
    };

    
    
    let config={
        header:{
            "Access-Control-Allow-Origin" : "*",
"Access-Control-Allow-Credentials" : "true",
"Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
"Access-Control-Allow-Headers" : "Origin, Content-Type, Accept",
        }
    }
    axios.post("http://127.0.0.1:8000/",{
        name,dob,race,gender,height,weight,a1c,bp,medicine,
    },config).then((response)=>{
        console.log(response);
    }).catch((error)=>{
        console.log(error);
    })
    alert("Thank you !");
    navigate('/prompt')
}
    const navigate = useNavigate();


  return (
    <div className="Home">
        <div className="main-block">
      <h1>Confirm your Appointment </h1>
      <form onSubmit={handleSubmit}>
        
        <input type="text" name="name" id="name" placeholder="Name" onChange={(event)=> setName(event.target.value)} required/>
        
        <input type="date" name="dob" id="dob" placeholder="Date of Birth" onChange={(event)=> setDob(event.target.value)} required/>
        
        <input type="text" name="race" id="race" placeholder="Race" onChange={(event)=> setRace(event.target.value)} required/>

        <input type='text'  name="gender" id="gender" placeholder="Gender" onChange={(event)=> setGender(event.target.value)} required/>  

        <input type="text" name="weight" id="weight" placeholder="weight"  onChange={(event)=> setWeight(event.target.value)} required/>

        <input type="text" name="height" id="height" placeholder="Height"  onChange={(event)=> setHeight(event.target.value)} required/>

        <input type="text" name="a1c" id="a1c" placeholder="A1C"  onChange={(event)=> setA1c(event.target.value)} required/>

        <input type="text" name="bp" id="bp" placeholder="Blood Pressure"   onChange={(event)=> setBp(event.target.value)} required/>

        <label>Plese enter your current medications / prescription seprated by comma (,)</label>

        <textarea name="medicine" id="medicine" placeholder="" rowa={4} cols={30}   onChange={(event)=> setMedicine(event.target.value)} required/>
        

       
        <div className="btn-block">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Home;