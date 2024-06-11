"use client"
import React, { useEffect, useState } from 'react'
import WinnerDisplay from '../components/WinnerDisplay'

const page = () => {
    const [winner, setWinner] = useState('0x1234...abcd');
    const [previousWinners, setPreviousWinners] = useState([
      '0x5678...efgh',
      '0x9101...ijkl',
      '0x1121...mnop',
      '0x3141...qrst',
    ]);
  
    const fetchWinners = async () => {
      // Fetch winners from the contract (sample data used here)
      // Uncomment and modify the following lines to fetch real data from your contract
      /*
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract('<LOTTERY_CONTRACT_ADDRESS>', lotteryABI, provider);
        const latestWinner = await contract.latestWinner();
        const previousWinners = await contract.getPreviousWinners();
        setWinner(latestWinner);
        setPreviousWinners(previousWinners);
      }
      */
    };
  
    useEffect(() => {
      fetchWinners();
    }, []);
  return (
    <div>
        <WinnerDisplay  previousWinners={previousWinners}/>
    </div>
  )
}

export default page