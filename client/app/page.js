"use client"
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import LotteryEntry from './components/LotteryEntry';
import lotteryABI from '../abis/DecentralizedLottery.json'
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';

const Home = () => {


  return (
    <div>
      <main className=" mx-auto p-4">
          <LotteryEntry  />
          {/* <WinnerDisplay winner={winner} /> */}
          <HowItWorks />
          <WhyChooseUs />
      </main>
    </div>
  );
};

export default Home;
