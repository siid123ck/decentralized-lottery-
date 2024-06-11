"use client"
import { useState } from 'react';
import { ethers } from 'ethers';

const LotteryEntry = ({ onEnter }) => {
  const [amount, setAmount] = useState('');

  const enterLottery = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const tx = await signer.sendTransaction({
        to: '<LOTTERY_CONTRACT_ADDRESS>',
        value: ethers.parseEther(amount)
      });
      await tx.wait();
      onEnter();
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="flex justify-center items-center p-8 bg-gray-50">
    <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-purple-900 mb-4">Enter the Lottery</h2>
      <input
        type="text"
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        placeholder="Enter 0.1 ETH fee"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        readOnly
      />
      <button
        className="w-full p-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-800"
        onClick={enterLottery}
      >
        Enter Lottery
      </button>
    </div>
  </div>
  );
};

export default LotteryEntry;
