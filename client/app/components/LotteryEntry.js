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
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl mb-4">Enter the Lottery</h2>
      <input
        type="text"
        className="w-full p-2 mb-4 text-black"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="w-full p-2 bg-blue-500 hover:bg-blue-700 rounded"
        onClick={enterLottery}
      >
        Enter
      </button>
    </div>
  );
};

export default LotteryEntry;
