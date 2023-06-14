import React from 'react'
import Navbar from './Navbar'
import Carousel from './Carousel'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { InfoState } from './Context';
import abi from './abi.json'
import { ethers } from "ethers";

const Home = () => {

  const [City,setcity] = useState("");
  const [Location,setlocation] = useState("");
  const {totalPages,setTotalPages} = InfoState();
  const {city,setCity} = InfoState();
  const {location,setLocation} = InfoState();
  const {length,setLength} = InfoState();
  const {data,setData}= InfoState();
  const {allData,setallData}= InfoState();
  const {basePrice,setbasePrice} = InfoState();
  const {financialMultiplier,setFinancialMultiplier} = InfoState()
 

  let navigate = useNavigate();
 
  

const userSubmission= async()=>{
  if (city === '' || location === '') {
    alert('Enter all fields');
  } else {
    try {
      const response = await axios.get(`http://localhost:8000/data/${city}/${location}`);
      if(city === 'Kolkata'){
        setFinancialMultiplier(2)
      }else if(city === 'Delhi'){
        setFinancialMultiplier(3)
      }else if(city === 'Mumbai'){
        setFinancialMultiplier(2.5)
      }else if(city === 'Chennai'){
        setFinancialMultiplier(1.5)
      }else{
        setFinancialMultiplier(3.5)
      }
      setLength(response.data.length);
      setData(response.data);
      navigate("/user", { replace: true });
    } catch (error) {
      console.log(error.message);
      console.log("Can't fetch data");
    }
  }
}

  return (
    <>
    
      <div className="carousel-background">
        <Carousel />
      </div>
    <Navbar/>
    <button onClick={()=>{navigate("/signin",{replace:true})}} style={{color:'white'}}>Go to wallet</button> 
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' , marginTop:'200px', color:'white'}}>
  <label htmlFor="fname" style={{ marginBottom: '10px' }}>Search city</label>
  <input type="text" id="fname" name="fname" style={{ border: '1px solid black', marginBottom: '10px', padding: '5px', borderRadius:'8px', width:'420px' }} onChange={(e) => { setCity(e.target.value) }} />

  <label htmlFor="lname" style={{ marginBottom: '10px' }}>Search location</label>
  <input type="text" id="lname" name="lname" style={{ border: '1px solid black', marginBottom: '10px', padding: '5px', borderRadius:'8px', width:'420px' , color:'black'}} onChange={(e) => { setLocation(e.target.value) }} />

  <button onClick={userSubmission} style={{ padding: '10px 20px', background: 'lightblue', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Search</button>
</div>
    

    </>
  )
}

export default Home