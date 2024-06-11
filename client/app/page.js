"use client"
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import LotteryEntry from './components/LotteryEntry';
import lotteryABI from '../abis/DecentralizedLottery.json'
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';

const Home = () => {
  const [winner, setWinner] = useState('');

  const fetchLatestWinner = async () => {
    if (window.ethereum) { 
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract('0x2ed37245EE68B74ADc9b04b65A8B76Fc28ea2355', lotteryABI, provider);
      const latestWinner = await contract.latestWinner();
      setWinner(latestWinner);
    }
  };

  useEffect(() => {
    fetchLatestWinner();
  }, []);

  return (
    <div>
      <main className=" mx-auto p-4">
          <LotteryEntry onEnter={fetchLatestWinner} />
          {/* <WinnerDisplay winner={winner} /> */}
          <HowItWorks />
          <WhyChooseUs />
      </main>
    </div>
  );
};

export default Home;
