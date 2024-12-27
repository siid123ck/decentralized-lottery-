"use client"

import { ethers } from "ethers";
import { useEffect, useState } from "react";

const Header = () => {
    const [isWalletConnected, setWalletConnected] = useState(false);
    const [account, setAccount] = useState(null);
    const [network, setNetwork] = useState(null);
    const [balance, setBalance] = useState(null);
    const REQUIRED_CHAIN_ID = "0xaa36a7";

    const connectWallet = async () => {
      try {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const networkDetails = await provider.getNetwork();

            if (networkDetails.chainId !== REQUIRED_CHAIN_ID) {
              alert("Other network is not supported, Please switch to Sepolia")
              try {
                // Switch to Sepolia

                await window.ethereum.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: REQUIRED_CHAIN_ID }],
                });
                console.log("Switched to Sepolia network");
              } catch (switchError) {
                if (switchError.code === 4902) {
                  await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: REQUIRED_CHAIN_ID,
                        chainName: "Sepolia Testnet",
                        rpcUrls: ["https://rpc.sepolia.org"],
                        nativeCurrency: {
                          name: "Sepolia ETH",
                          symbol: "ETH",
                          decimals: 18,
                        },
                        blockExplorerUrls: ["https://sepolia.etherscan.io"],
                      },
                    ],
                  });
                } else {
                  console.error("Failed to switch network:", switchError.message);
                  return;
                }
              }
            }

            const userBalance = await provider.getBalance(accounts[0])
            console.log('connected');
            setAccount(accounts[0])
            setNetwork(networkDetails.name)
            setBalance(ethers.formatEther(userBalance))
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
          const provider = new ethers.BrowserProvider(window.ethereum)
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const networkDetails = await provider.getNetwork();
            const userBalance = await provider.getBalance(accounts[0])
            setAccount(accounts[0])
            setNetwork(networkDetails.name)
            setBalance(ethers.formatEther(userBalance))
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
        :(
          <div className="ml-4 p-2 text-purple-950 font-bold rounded flex flex-col items-start">
            <p>Account: {account}</p>
            <p>Network: {network}</p>
            <p>Balance: {balance} ETH</p>
          </div>
        )
        }
      </header>
    );
  };
  
  export default Header;
  