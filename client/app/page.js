"use client"
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Header from './components/Header';
import LotteryEntry from './components/LotteryEntry';
import WinnerDisplay from './components/WinnerDisplay';
import lotteryABI from '../abis/DecentralizedLottery.json'

const Home = () => {
  const [winner, setWinner] = useState('');

  const fetchLatestWinner = async () => {
    if (window.ethereum) { 
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract('<LOTTERY_CONTRACT_ADDRESS>', lotteryABI, provider);
      const latestWinner = await contract.latestWinner();
      setWinner(latestWinner);
    }
  };

  useEffect(() => {
    fetchLatestWinner();
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LotteryEntry onEnter={fetchLatestWinner} />
          <WinnerDisplay winner={winner} />
        </div>
      </main>
    </div>
  );
};

export default Home;
