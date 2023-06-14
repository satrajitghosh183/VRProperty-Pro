import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function Upload() {
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [maintenanceStaff, setMaintenanceStaff] = useState('');
  const [powerBackup, setPowerBackup] = useState('');
  const [carParking, setCarparking] = useState('');
  const [staffQuarter, setStaffQuarter] = useState('');
  
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  const data = {
        price,
        area,
        location,
        city,
        maintenanceStaff,
        powerBackup,
        carParking,
        staffQuarter
  }

  const submit = async()=>{

    try{
        const response = await axios.post('http://localhost:8000/putData',data)
    }catch(err){
        console.log(err);
    }
  }

  return (
    <div className="form-container">
      <h2>Property Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="area">Area:</label>
          <input
            type="text"
            className="form-control"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="maintenanceStaff">Maintenance Staff:</label>
          <input
            type="text"
            className="form-control"
            value={maintenanceStaff}
            onChange={(e) => setMaintenanceStaff(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="powerBackup">Power Backup:</label>
          <input
            type="text"
            className="form-control"
            value={powerBackup}
            onChange={(e) => setPowerBackup(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="carParking">Car Parking:</label>
          <input
            type="text"
            className="form-control"
            value={carParking}
            onChange={(e) => setCarparking(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="staffQuarter">Staff Quarter:</label>
          <input
            type="text"
            className="form-control"
            value={staffQuarter}
            onChange={(e) => setStaffQuarter(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn" onClick={submit}>
          Submit
        </button><br></br><br></br>
        <button onClick={()=>{navigate("/home2", { replace: true });}}>return</button>
      </form>
    </div>
  );
}

export default Upload;
