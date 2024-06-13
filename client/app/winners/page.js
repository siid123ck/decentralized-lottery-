"use client"
import React, { useEffect, useState } from 'react'
import WinnerDisplay from '../components/WinnerDisplay'
import lottoAbi from '../../abis/DecentralizedLottery.json'
import { ethers } from 'ethers'


const page = () => {
    
    const [winner, setWinner] = useState('0x1234...abcd');
    const [previousWinners, setPreviousWinners] = useState([
      '0x5678...efgh',
      '0x9101...ijkl',
      '0x1121...mnop',
      '0x3141...qrst', 
    ]);

    const contractAddress = process.env.NEXT_PUBLIC_LOTTO_CONTRACT_ADDRESS;
  
    const fetchWinners = async () => {   
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, lottoAbi, provider);
        const latestWinner = await contract.winner();
        // const previousWinners = await contract.winners();
        setWinner(latestWinner);
        // setPreviousWinners(previousWinners);
      }
      
    };
  
    useEffect(() => {
      fetchWinners();
    }, []);
  return (
    <div>
        <WinnerDisplay winner={winner}  previousWinners={previousWinners}/>
    </div>
  )
}

export default page