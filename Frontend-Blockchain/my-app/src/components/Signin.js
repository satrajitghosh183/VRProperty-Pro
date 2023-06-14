import React from 'react';
import { useEffect, useState } from 'react';
import {ethers, utils} from 'ethers';
import { useNavigate } from "react-router-dom";
import { InfoState } from './Context';
import metamask from './pics/metamask.png' 
import screenshot from './pics/screenshot.png'
const Signin = () => {
  const {walletAddress, setwalletAddress} = InfoState();

  let navigate = useNavigate();
  useEffect(()=>{
      getConnectedWallet();
      changeAcc();
  },[walletAddress]);

  var Web3 = require('web3');
  // var web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/RPksIJ_82vEHQuWJT7QIjhKdOQV66zC9')
  const message = 'thisisadapp'

  const verify = async()=>{

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const acc = await ethers.utils.verifyMessage(message,signature);
    // console.log(signature);
     console.log(acc);
     if(acc.toLowerCase() === walletAddress.toLowerCase()){
       if(acc === '0xe6a0a94884BD4d690a317eF0e1d8b251E64222BF'){
        navigate("/home1", { replace: true });
       }
       else if(acc === '0x3E29B4d0269fA987E3c0ABc3082e65C68122Ad0e'){
        navigate("/home2", { replace: true });
       }else{
        navigate("/", { replace: true });
       }
      
     }else{
      alert('Access denied');
     }
  }
  

  const connectWallet = async()=>{
    if(typeof window !='undefined' && typeof window.ethereum != 'undefined'){
      try{
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setwalletAddress(accounts[0]);
          console.log(walletAddress);
      }catch(err){
          console.log(err.message);
      }
    }else{
      console.log('install metamask');
    }
  }

  const getConnectedWallet = async()=>{
    if(typeof window !='undefined' && typeof window.ethereum != 'undefined'){
      try{
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          setwalletAddress(accounts[0]);
          // console.log(walletAddress);
      }catch(err){
          console.log(err.message);
      }
    }else{
      console.log('install metamask');
    }
  }

  const changeAcc = async()=>{
    if(typeof window != 'undefined' && window.ethereum != 'undefined')
    {
      try{
        window.ethereum.on('accountsChanged', (accounts)=>{
          if (accounts.length === 0) {
            console.log('Please connect to MetaMask.');
            // setwalletAddress("");
          } else{
             setwalletAddress(accounts[0]);
          }
        })
      }catch(err){
          console.log(err.message);
      }
    }
  }

  return (
    <>

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5', backgroundImage: `url(${screenshot})`,backgroundRepeat:"no-repeat",width:'100%',backgroundSize: "cover",height:'100vh'}}>
      <div style={{ width: '400px', padding: '20px', backgroundColor:'transparent',color:'white', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={connectWallet} style={{ border: '1px solid', padding: '10px 20px', width:'180px', display:'flex',direction:'row',borderRadius:'6px' }}>
            {walletAddress && walletAddress.length > 0 ? `Connected: ${walletAddress.slice(0, 7)}....` : 'Connect Wallet'} <span><img src={metamask} style={{width:'40px', borderRadius:'40px' }} ></img></span>
          </button>
        </div>
        <button onClick={verify} style={{ border: '1px solid', padding: '10px 20px', width:'180px', borderRadius:'6px' }}>
          Login
        </button>
      </div>
      {/* <div style={{borderRadius:'40px'}}> */}
     
      {/* </div> */}
    </div>
    
     
    
    </>
  )
}

export default Signin