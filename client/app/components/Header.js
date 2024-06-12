"use client"

import { ethers } from "ethers";
import { useEffect, useState } from "react";

const Header = () => {
    const [isWalletConnected, setWalletConnected] = useState(false);

    const connectWallet = async () => {
      try {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('connected');
            console.log(accounts[0])
            setWalletConnected(true);
        } else {
          console.error('MetaMask is not installed');
        }
      } catch (error) {
        console.error('Error connecting wallet:', error.message);
      }
    };
  
    useEffect(() => {
      const checkIfWalletIsConnected = async () => {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletConnected(true);
          }
        }
      };
  
      checkIfWalletIsConnected();
    }, []);
    return (
      <header className="flex justify-between items-center p-4 bg-white text-black shadow-md">
        <h1 className="text-2xl font-bold text-purple-900">
            <a href="/" >Decentralized Lottery</a>
        </h1>
        <nav>
          <ul className="flex space-x-8">
            <li><a href="#how-it-works" className="hover:text-purple-700">How It Works</a></li>
            <li><a href="/winners" className="hover:text-purple-700">Winners</a></li>
            <li><a href="#blog" className="hover:text-purple-700">Blog</a></li>
          </ul>
        </nav>
        {!isWalletConnected?
        <button
        className="ml-4 p-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-800"
        onClick={connectWallet}> Connect Wallet
        </button>
        :<button
        className="ml-4 p-2 bg-green-600 text-white font-bold rounded hover:bg-purple-800"
        > Connected
        </button>
        }
      </header>
    );
  };
  
  export default Header;
  