import React, { useEffect, useState } from 'react'
import { InfoState } from './Context';
import abi from './abi.json';
import { ethers } from 'ethers';
import home from './pics/home.jpg'
import eth from './pics/eth.png'
import { useNavigate } from "react-router-dom";
import user_back from './pics/user_back.jpeg'
const User_page = () => {

    const {data,setData}= InfoState();
    const {length,setLength}= InfoState();
    const { walletAddress, setwalletAddress } = InfoState();
    const {basePrice,setbasePrice} = InfoState();
    const {financialMultiplier,setFinancialMultiplier} = InfoState();
    const {area,setArea} = InfoState();
    const {price,setPrice} = InfoState();

    let navigate = useNavigate();
    const [state,setState] = useState([]);

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

      useEffect(() => {
        if (data.length > 0) {
          getStatus();
        }
        console.log(state)
      }, [data]);

      const buyProperty = async(id,val)=>{
        try{
            const valueWei = ethers.utils.parseEther(val.toString());
            const contractWithSigner = contract.connect(signer);
            const tx = await contractWithSigner.getProperty(id,{value: valueWei});
            await tx.wait();
            alert('completed');
        }catch(err){
            console.log(err);
        }
       
      }

   
  return (
  //  <>style={{backgroundImage: `url(${black_guy})`,backgroundRepeat:"no-repeat",width:'100%',backgroundSize: "cover"}}
    
        <div style={{backgroundImage: `url(${user_back})`,backgroundRepeat:"no-repeat",width:'100%',backgroundSize: "cover",height:'100vh', padding:'10px'}}>
           <button onClick={()=>{navigate("/", { replace: true });}} style={{color:"white"}}>&larr;</button>
          <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '80px', padding:'15px'}}>
            {data.map((prod,i)=>{

                if(state[i] === 2){

                    return(
                      
                        <div className="card" style={{ width: '18rem',backgroundColor:'black', color:'white'}} key={prod._id}>
                            <img class="card-img-top" src={home} alt="Card image cap"></img>
                        <div className="card-body">
                          <h5 className="card-title">{prod._id}</h5>
                          <span><p className="card-text">{((prod.Price / 100000) / 2000).toString().slice(0,6)} ETH</p><img style={{width:'45px'}} src ={eth}></img> </span>
                          <div style={{display:'flex', padding:'12px',marginLeft:'10px'}}>
                          <button
                            style={{ border: '1px solid white',padding:'4px',borderRadius:'5px',width:'100px'}} onClick={()=>buyProperty(prod._id,(prod.Price / 100000) / 2000)}>
                            
                                buy
                          </button><button onClick={()=>{setbasePrice((prod.Price / 100000) / 2000)
                            setArea(prod.Area)
                            setPrice(prod.Price)
                               navigate("/data", { replace: true });
                               console.log(basePrice)
                        }} style={{marginLeft:'30px', border:'1px solid white',padding:'6px',borderRadius:'5px'}}>Prediction</button></div>
                        </div>
                      </div>
                      
                    )
                }
            })}
            </div>
        
    
</div>
  )
}

export default User_page