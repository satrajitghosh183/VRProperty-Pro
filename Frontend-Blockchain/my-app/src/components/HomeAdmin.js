import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { InfoState } from './Context';
import abi from './abi.json'
import { ethers } from "ethers";
import admin_front from './pics/admin_front.jpg'

const HomeAdmin = () => {

    const [City,setcity] = useState("");
    const [Location,setlocation] = useState("");
    const {length,setLength} = InfoState();
    const {data,setData}= InfoState();

    let navigate = useNavigate();
    const adminSubmission = async () => {
        if (City === '' || Location === '') {
          alert('Enter all fields');
        } else {
          try {
            const response = await axios.get(`http://localhost:8000/data/${City}/${Location}`);
            setLength(response.data.length);
            setData(response.data);
            navigate("/admin", { replace: true });
          } catch (error) {
            console.log(error.message);
            console.log("Can't fetch data");
          }
        }
      };

  return (
    <>
    {/* <div className='h-52' style={{border:'1px solid black', width:'500px', marginLeft:'600px',marginTop:'250px'}}>
    <div className='h-52' style={{border:'1px solid black', width:'225px',display:'flex', flexDirection:'column', alignItems:'center'}}>
       
       <label for="fname">Search here</label>
  <input type="text" id="fname" name="fname" style={{border:'1px solid black'}} onChange={(e)=>{setcity(e.target.value)}}/>


  <label for="fname">Search here</label>
  <input type="text" id="fname" name="fname" style={{border:'1px solid black'}} onChange={(e)=>{setlocation(e.target.value)}}/>
  
  <button onClick={adminSubmission}>search</button>
  
    </div>
        </div> */}

<div style={{backgroundImage: `url(${admin_front})`,backgroundRepeat:"no-repeat",width:'100%',backgroundSize: "cover",height:'100vh'}}>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' , color:'white'}}>
  <label htmlFor="fname" style={{ marginBottom: '10px' }}>Search city</label>
  <input type="text" id="fname" name="fname" style={{ border: '1px solid black', marginBottom: '10px', padding: '5px', borderRadius:'8px', width:'420px' }} onChange={(e) => { setcity(e.target.value) }} />

  <label htmlFor="lname" style={{ marginBottom: '10px' }}>Search location</label>
  <input type="text" id="lname" name="lname" style={{ border: '1px solid black', marginBottom: '10px', padding: '5px', borderRadius:'8px', width:'420px' , color:'black'}} onChange={(e) => { setlocation(e.target.value) }} />

  <button onClick={adminSubmission} style={{ padding: '10px 20px', background: 'lightblue', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Search</button>
</div>
<button onClick={()=>{navigate("/signin",{replace:true})}} style={{color:'white'}}>Go to wallet</button>
</div>
    </>
  )
}

export default HomeAdmin