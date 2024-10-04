import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const REACT_APP_INFURA_URL = `https://optimism-mainnet.infura.io/v3/${
    import.meta.env.VITE_APP_INFURA_ID
  }`;

  const navigate = useNavigate();

  const fetchPrice = async (coinCode) => {
    try {
      const index = priceFeedAddresses.findIndex((obj) =>
        obj.name.includes(coinCode)
      );
      // Set up a provider using your RPC URL
      const provider = new ethers.JsonRpcProvider(REACT_APP_INFURA_URL);

      // ABI for Chainlink's AggregatorV3Interface
      const aggregatorV3InterfaceABI = [
        {
          inputs: [],
          name: "decimals",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "description",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint80", name: "_roundId", type: "uint80" },
          ],
          name: "getRoundData",
          outputs: [
            { internalType: "uint80", name: "roundId", type: "uint80" },
            { internalType: "int256", name: "answer", type: "int256" },
            { internalType: "uint256", name: "startedAt", type: "uint256" },
            { internalType: "uint256", name: "updatedAt", type: "uint256" },
            { internalType: "uint80", name: "answeredInRound", type: "uint80" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "latestRoundData",
          outputs: [
            { internalType: "uint80", name: "roundId", type: "uint80" },
            { internalType: "int256", name: "answer", type: "int256" },
            { internalType: "uint256", name: "startedAt", type: "uint256" },
            { internalType: "uint256", name: "updatedAt", type: "uint256" },
            { internalType: "uint80", name: "answeredInRound", type: "uint80" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "version",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ];

      // Fetch prices for each token
      const priceFeed = new ethers.Contract(
        priceFeedAddresses[index].address,
        aggregatorV3InterfaceABI,
        provider
      );
      // Fetch the latest round data
      const latestRoundData = await priceFeed.latestRoundData();
      const latestPrice = latestRoundData.answer.toString();
      const decimals = 8; // Chainlink usually uses 8 decimals
      const formattedLatestPrice = latestPrice / 10 ** decimals;

      // Fetch the previous round data (latest round - 1)
      const previousRoundId = latestRoundData.roundId - BigInt(1); // Explicitly handle BigInt subtraction
      const previousRoundData = await priceFeed.getRoundData(previousRoundId);
      const previousPrice = Number(previousRoundData.answer.toString());
      const formattedPreviousPrice = previousPrice / 10 ** decimals;

      // Calculate the percentage change
      const priceChange =
        ((formattedLatestPrice - formattedPreviousPrice) /
          formattedPreviousPrice) *
        100;

      return {
        formattedLatestPrice,
        priceChange: priceChange.toFixed(2),
      };
    } catch (error) {
      console.error("Error fetching price:", error);
      return null; // Return null if an error occurs
    }
  };

  const priceFeedAddresses = [
    { name: "BTC/USD", address: "0xD702DD976Fb76Fffc2D3963D037dfDae5b04E593" },
    { name: "ETH/USD", address: "0x13e3Ee699D1909E989722E753853AE30b17e08c5" },
    { name: "USDT/USD", address: "0xECef79E109e997bCA29c1c0897ec9d7b03647F5E" },
    { name: "BNB/USD", address: "0xD38579f7cBD14c22cF1997575eA8eF7bfe62ca2c" },
    { name: "SOL/USD", address: "0xC663315f7aF904fbbB0F785c32046dFA03e85270" },
    { name: "XRP/USD", address: "0x8788F0DBDa7678244Ac7FF09d963d7696D56A8a0" },
    { name: "USDC/USD", address: "0x16a9FA2FDa030272Ce99B29CF780dFA30361E0f3" },
    { name: "DOGE/USD", address: "0xC6066533917f034Cf610c08e1fe5e9c7eADe0f54" },
    { name: "ADA/USD", address: "0x43dEa17DeE1ca50c6266acb59b32659E44D3ee5D" },
    { name: "TRX/USD", address: "0x0E09921cf7801A5aD47B892C8727593275625a9f" },
    {
      name: "AVAX/USD",
      address: "0x5087Dc69Fd3907a016BD42B38022F7f024140727",
    },
    { name: "SHIB/USD", address: "0xd1e56e7657C0E0d20c0e11C2B6ae0D90932d5665" },
    { name: "WBTC/USD", address: "0x718A5788b89454aAE3A028AE9c111A29Be6c2a6F" },
    { name: "LINK/USD", address: "0xCc232dcFAAE6354cE191Bd574108c1aD03f86450" },
    { name: "DOT/USD", address: "0x28e67BAeEB5dE7A788f3Dde6CF6ee491369Bb3Fa" },
    { name: "UNI/USD", address: "0x11429eE838cC01071402f21C219870cbAc0a59A0" },
    { name: "BCH/USD", address: "0x33E047119359161288bcB143e0C15467C7151d4c" },
    { name: "DAI/USD", address: "0x8dBa75e83DA73cc766A7e5a0ee71F656BAb470d6" },
    { name: "LTC/USD", address: "0x45954efBD01f5A12428A09E4C38b8434C3dD4Ac3" },
    { name: "PEPE/USD", address: "0x64Ecf089a6594Be781908D5a26FC8fA6CB08A2C7" },
    { name: "SUI/USD", address: "0xEaf1a9fe242aa9928faedc6CE7e09aD4875f7133" },
    { name: "ICP/USD", address: "0xe98290265E4aE3758503a03e937F381A2A7aFB57" },
    { name: "APT/USD", address: "0x48f2EcF0Bd180239AEF474a9da945F2e2d41daA3" },
    { name: "IMX/USD", address: "0x26Fce884555FAe5F0E4701cc976FE8D8bB111A38" },
    { name: "NEAR/USD", address: "0xca6fa4b8CB365C02cd3Ba70544EFffe78f63ac82" },
    { name: "ETC/USD", address: "0xb7B9A39CC63f856b90B364911CC324dC46aC1770" },
    { name: "STX/USD", address: "0x602eB777BE29Fbe63349A33306bD73Ff333D02bB" },
    { name: "XMR/USD", address: "0x2a8D91686A048E98e6CCF1A89E82f40D14312672" },
    { name: "USDE/USD", address: "0xEEDF0B095B5dfe75F3881Cb26c19DA209A27463a" },
    { name: "WIF/USD", address: "0x75c3bF05EeF2c1966D6d5890Def3DbE640627642" },
  ];

  const FilterFxn = (coins) => {
    const filteredCoins = coins?.filter((coin) => {
      return priceFeedAddresses.some((feed) =>
        feed.name.startsWith(coin.symbol)
      );
    });
    return filteredCoins;
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        navigate("/"); // Redirect to landing page
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, handleLogout, FilterFxn, fetchPrice }}
    >
      {children}
    </AuthContext.Provider>
  );
};
