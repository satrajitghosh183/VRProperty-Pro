import React, { useEffect, useState } from 'react'
import { InfoState } from './Context';
import abi from './abi.json';
import { ethers } from 'ethers';
import house from './pics/house.jpeg'
import eth from './pics/eth.png'
import home from './pics/home.jpg'
import { useNavigate } from "react-router-dom";
const Admin_page = () => {
    const {data,setData}= InfoState();
    const {length,setLength}= InfoState();
    const { walletAddress, setwalletAddress } = InfoState();

    const [state,setState] = useState([]);


  let navigate = useNavigate();

    let address = '0x61367d6B7F34370b78a0A149F55941667b210E55';
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(address, abi, signer);

    const getStatus = async () => {
        try {
          const promises = data.map((prod) => contract.getPropertyStatus(prod._id));
          const results = await Promise.all(promises);
          setState(results);
        } catch (error) {
          console.error('Error getting statuses:', error);
        }
      };

      const approve = async(id)=>{
        try{
            if (walletAddress !== '0xe6a0a94884bd4d690a317ef0e1d8b251e64222bf') {
                console.log('You are not authorized to perform this action.');
                return;
              }
            const contractWithSigner = contract.connect(signer);
            const tx = await contractWithSigner.approveProperty(id);
            await tx.wait();
          alert('completed');
        }catch(err){
            console.log(err);
        }
       
      }

      useEffect(() => {
        if (data.length > 0) {
          getStatus();
        }
        console.log(state)
      }, [data]);
      
  return (
    <>
    <div>
          <button onClick={()=>{navigate("/home1", { replace: true });}}>&larr;</button>
           <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '80px', padding:'10px'}}>
            {data.map((prod,i)=>{
                if(state[i] === 1){
                    return(
                        <div className="card" style={{ width: '18rem' , backgroundColor:'black', color:'white'}} key={prod._id}>
                          <img class="card-img-top" src={home} alt="Card image cap"></img>
                        <div className="card-body">
                          <h5 className="card-title">{prod._id}</h5>
                          <span><p className="card-text">{((prod.Price / 100000) / 2000).toString().slice(0,6)} ETH</p><img style={{width:'45px'}} src ={eth}></img> </span>
                          <button
                            style={{ border: '1px solid white' , borderRadius:'4px', padding:'2px'}} onClick={()=>approve(prod._id)}>
                            
                                approve
                          </button>
                        </div>
                      </div>
                    )
                }
            })
        }</div>
    </div>
    </>
  )
}

export default Admin_page