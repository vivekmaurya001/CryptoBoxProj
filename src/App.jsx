import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import HomePage2 from "./components/MainPage/HomePage2";
import Landing from "./components/Landing";
import { AuthContext } from "./Context/contextApi";
import { ethers } from "ethers";
import WalletLink from "@coinbase/wallet-sdk";

function App() {
  const [account, setAccount] = useState(null);
  const [Balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const [WalletType, setwallettype] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const switchingNetwork = async (str) => {
    try {
      // Request to switch network to Ethereum Mainnet
      if (str === "ETH") {
        if (WalletType === "metamask") {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }], // 0x1 is the chainId for Ethereum Mainnet in hexadecimal
          });
        } else {
          await ethereum.send("wallet_switchEthereumChain", [
            { chainId: "0x1" },
          ]);
        }
      } else if (str === "sepETH") {
        // Request to switch network
        if (WalletType === "metamask") {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }], // 0xaa36a7 is 11155111 in hex (Sepolia's chainId)
          });
        } else {
          await ethereum.send("wallet_switchEthereumChain", [
            { chainId: "0xaa36a7" },
          ]); // Sepolia's chainId
        }
      }
      if (WalletType == "metamask") {
        connectWallet("metamask");
      } else {
        connectWallet("coinbase");
      }
    } catch (error) {
      // Handle errors
      if (error.code === 4902) {
        // This error code means the Ethereum Mainnet has not been added to MetaMask
        console.log("Ethereum Mainnet is not added to MetaMask.");
      } else {
        console.log("Failed to switch to Ethereum Mainnet:", error);
      }
    }
  };

  const walletLink = new WalletLink({
    appName: "CryptoBox",
    darkMode: false,
  });

  const ethereum = walletLink.makeWeb3Provider(
    `https://optimism-mainnet.infura.io/v3/${
      import.meta.env.VITE_APP_INFURA_ID
    }`,
    1
  );

  const connectWallet = async (walletType) => {
    if (walletType === "metamask" && window.ethereum) {
      try {
        setwallettype(walletType);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        setNetwork(network.name.toUpperCase());
        const balance = await provider.getBalance(accounts[0]);
        const balanceInEther = ethers.formatEther(balance);
        setBalance(balanceInEther);
        setIsModalVisible(false); // Hide modal after connection
      } catch (error) {
        console.log("Failed to connect metamask wallet:", error);
      }
    } else if (walletType === "coinbase" && ethereum) {
      try {
        setwallettype(walletType);
        const accounts = await ethereum.enable(); // Enable Coinbase Wallet
        setAccount(accounts[0]);

        const provider = new ethers.BrowserProvider(ethereum);
        const network = await provider.getNetwork();
        setNetwork(network.name.toUpperCase());

        const balance = await provider.getBalance(accounts[0]);
        const balanceInEther = ethers.formatEther(balance);
        setBalance(balanceInEther);
      } catch (error) {
        console.log("Failed to connect coinbase wallet:", error);
      }
    } else {
      alert("Please install a supported wallet!");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        connectWallet();
      });
      // Listen for network changes
      window.ethereum.on("chainChanged", (chainId) => {
        console.log("Network changed to:", chainId);
        connectWallet();
      });
    }
    if (currentUser) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route
          exact
          path="/dashboard"
          element={
            currentUser ? (
              <HomePage2
                network={network}
                switchingNetwork={switchingNetwork}
                Balance={Balance}
                connectWallet={connectWallet}
                account={account}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
