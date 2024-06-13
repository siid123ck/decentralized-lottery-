"use client"
import { useState } from 'react';
import { ethers } from 'ethers';
import lotteryABI from '../../abis/DecentralizedLottery.json';

const LotteryEntry = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const contractAddress = process.env.NEXT_PUBLIC_LOTTO_CONTRACT_ADDRESS;


  const enterLottery = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(contractAddress, 
        lotteryABI, signer);

        const tx = await contract.enterLottery({
          value: ethers.parseEther(amount),
          gasLimit:210000,
        });

        await tx.wait();
        setMessage('You have successfully entered the lottery. Please wait for the draw of the winner.');

      } catch (error) {
        console.error('Error entering lottery:', error);
        setMessage('There was an error entering the lottery. Please try again.');
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
      {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}
    </div>
  </div>
  );
};

export default LotteryEntry;
