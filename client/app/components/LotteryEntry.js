"use client"
import { useState } from 'react';
import { ethers } from 'ethers';
import lotteryABI from '../../abis/DecentralizedLottery.json'

const LotteryEntry = ({ onEnter }) => {
  const [amount, setAmount] = useState('');


  const enterLottery = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log(signer)

        const contract = new ethers.Contract("0x2ed37245EE68B74ADc9b04b65A8B76Fc28ea2355", 
        lotteryABI, signer);

        const tx = await contract.enterLottery({
          value: ethers.parseEther(amount),
          gasLimit:210000,
        });

        await tx.wait();
        onEnter();
      } catch (error) {
        console.error('Error entering lottery:', error);
      }
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
