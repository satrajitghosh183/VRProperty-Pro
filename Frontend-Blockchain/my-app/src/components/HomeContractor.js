import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { InfoState } from './Context';
import abi from './abi.json'
import { ethers } from "ethers";
import Carousel2 from './Carousel2'
import {
  Link
} from "react-router-dom"
// import { useHistory } from 'react-router-dom';

const HomeContractor = () => {

    const [City,setcity] = useState("");
    const [Location,setlocation] = useState("");
    const {totalPages,setTotalPages} = InfoState();
    const {city,setCity} = InfoState();
    const {location,setLocation} = InfoState();
    const {length,setLength} = InfoState();
    const {data,setData}= InfoState();
    // const history = useHistory();

    let navigate = useNavigate();


    const submit = ()=>{
   
        if(City === '' || Location === ''){
            alert('Enter all fields')
        }
        else{
          try{
                axios.get(`http://localhost:8000/data/${City}/${Location}`)
                .then((response)=>{
                  console.log(response.data.length)
                  setLength(response.data.length);
                  setTotalPages(Math.ceil(response.data.length/10))
                  setCity(City);
                  setLocation(Location);
                }).catch((error)=>{
                  console.log(error.message)
                })
    
                navigate("/list", { replace: true });
    
          }catch(err){
            console.log(err);
            console.log("Can't fetch data")
          }
    
        }
      }
    
  return (
    <>
     <div className="carousel-background">
      {/* <button onClick={()=>{navigate("/signin",{replace:true})}} style={{color:'white'}}>Go to wallet</button> */}
        <Carousel2 />
      </div> 
      <div>
      <button onClick={()=>{navigate("/signin",{replace:true})}} style={{color:'white'}}>Go to wallet</button> 
          <button onClick={()=>{ navigate("/upload", { replace: true });}} style={{padding: '10px 20px', background: 'lightblue', border: 'none', borderRadius: '8px', cursor: 'pointer',marginLeft:'1250px',marginTop:'40px'}}>Upload &#8679;</button>
        </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' , marginTop:'200px', color:'white'}}>
       <label for="fname" style={{ marginBottom: '10px' }}>Search city</label>
  <input type="text" id="fname" name="fname" style={{border:'1px solid black', marginBottom: '10px', padding: '5px', borderRadius:'8px', width:'420px',color:'black'}} onChange={(e)=>{setcity(e.target.value)}}/>


  <label for="fname" style={{ marginBottom: '10px' , color:'white' }}>Search location</label>
  <input type="text" id="fname" name="fname" style={{border:'1px solid black', marginBottom: '10px', padding: '5px', borderRadius:'8px', width:'420px' , color:'black'}} onChange={(e)=>{setlocation(e.target.value)}}/>
  
  <button onClick={submit} style={{ padding: '10px 20px', background: 'lightblue', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>search</button>
  <div>
  {/* <button onClick={()=>{history.push('https://www.w3schools.com/charsets/ref_utf_arrows.asp');}}>Redirect to New Page</button> */}
  <a href="http://192.168.1.103/">Click here</a>
    </div>
  </div>
    
        
        </>
  )
}

export default HomeContractor