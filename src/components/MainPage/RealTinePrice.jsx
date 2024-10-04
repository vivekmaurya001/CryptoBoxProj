import { Avatar } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/contextApi";
import millify from "millify";

const RealTinePrice = ({ CoinArray, coinId }) => {
  const [LatestPrice, setLatestPrice] = useState(null);
  const [PriceChange, setPriceChange] = useState(null);
  const { fetchPrice } = useContext(AuthContext);

  const CoinObj = CoinArray?.find((obj) => obj.uuid === coinId);
  useEffect(() => {
    setPriceChange(CoinObj?.change);
    const fetchLatestPrice = async () => {
      if (CoinObj) {
        const LatestObj = await fetchPrice(CoinObj.symbol);
        if (LatestObj !== undefined && LatestObj !== null) {
          setLatestPrice(LatestObj.formattedLatestPrice);
          setPriceChange(LatestObj.priceChange);
        } else {
          console.error("Price is undefined or null");
        }
      }
    };
    fetchLatestPrice();
    const intervalId = setInterval(fetchLatestPrice, 10000); // 10000 ms = 10 seconds
    return () => clearInterval(intervalId);
  }, [CoinObj, fetchPrice]);

  if (!CoinObj) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-1 mb-7">
      <div className="flex items-end gap-2">
        <Avatar shape="circle" src={CoinObj.iconUrl} />
        <b className="text-2xl">{CoinObj.name}</b>
        <p className="text-slate-400">{CoinObj.symbol}</p>
      </div>
      <b className="text-3xl ">${LatestPrice || CoinObj.price}</b>
      <span
        className={`ml-2 text-xl ${
          PriceChange < 0 ? "text-red-500" : "text-green-500"
        } flex items-center`}
      >
        {/* Arrow indicating up or down */}
        {PriceChange < 0 ? (
          <span className="mr-1">&#9660;</span> // Down arrow
        ) : (
          <span className="mr-1">&#9650;</span> // Up arrow
        )}
        {PriceChange}% 1d
      </span>

      <div className="flex justify-between items-center mt-4">
        <p>Market Volume</p>
        <b className="text-lg"> $ {millify(Number(CoinObj.marketCap))}</b>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p>24Hr Volume Distribution</p>
        <b className="text-lg"> $ {millify(Number(CoinObj["24hVolume"]))}</b>
      </div>
    </div>
  );
};

export default RealTinePrice;
