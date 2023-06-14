import React, { useEffect, useState } from 'react'
import { InfoState } from './Context';
import abi from './abi.json';
import { ethers } from 'ethers';
import Data from './Data';

const Bucket = () => {

    const [state,setState] = useState([]);
    const [Address,setAddress] = useState([]);

    const { walletAddress, setwalletAddress } = InfoState();
    const {allData,setallData} = InfoState();

    let address = '0x61367d6B7F34370b78a0A149F55941667b210E55';
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(address, abi, signer);

    const getStatus = async () => {
        try {
          const promises = allData.map((prod) => contract.getPropertyStatus(prod._id));
          const results = await Promise.all(promises);
          setState(results);
        } catch (error) {
          console.error('Error getting statuses:', error);
        }
      };

    const getAddress = async()=>{
        try{

            const promises = allData.map((prod) => contract.getPropertyOwner(prod._id));
            const results = await Promise.all(promises);
            setAddress(results);

        }catch(err){
                console.log(err);
        }
    }
    useEffect(()=>{
        getStatus();
        getAddress();
    },[allData])

  return (
    <div>
        {
            allData.map((prod,i)=>{
                if(state[i]===3 && Address[i]===walletAddress){
                    return(
                        <div className="card" style={{ width: '18rem' }} key={prod._id}>
                        <div className="card-body">
                          <h5 className="card-title">{prod._id}</h5>
                          <p className="card-text">Card's content.</p>
                        </div>
                      </div>
                    )
                }
            })
        }
    </div>
  )
}

export default Bucket