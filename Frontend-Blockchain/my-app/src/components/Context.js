import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
const Info = createContext();
const InfoContext = ({children})=>{
    const [data,setData] = useState([]);
    const [totalPages,setTotalPages] = useState(0);
    const [location,setLocation] = useState();
    const [city,setCity] = useState();
    const [length,setLength] = useState(0);
    const [walletAddress,setwalletAddress] = useState();
    const [allData,setallData] = useState([]);
    const [basePrice,setbasePrice] = useState(0.0);
    const [financialMultiplier,setFinancialMultiplier] = useState(0);
    const [price,setPrice] = useState(0.0);
    const [area,setArea] = useState(0);

    return(
        <>
        <Info.Provider value={{allData,setallData,data,setData,totalPages,setTotalPages,location,setLocation,city,setCity,length,setLength,walletAddress,setwalletAddress,basePrice,setbasePrice,financialMultiplier,setFinancialMultiplier,price,setPrice,area,setArea}}>
            {children}
        </Info.Provider>
        </>
    )
}
export default InfoContext
export const InfoState=()=>{
    return useContext(Info);
} 