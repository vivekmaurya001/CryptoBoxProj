import millify from "millify";
import React from "react";

const CryptoCurrencies = ({ CoinArray }) => {
  return (
    <div className="text-white flex">
      <div className={`flex gap-2 p-8 w-full overflow-x-scroll flex-nowrap`}>
        {CoinArray?.slice(0, 10).map((coin, i) => (
          <div
            key={coin.uuid}
            className="w-[280px] h-40 p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 shrink-0"
          >
            <div className="flex gap-4 items-center">
              <img
                src={coin.iconUrl}
                alt={`${coin.name} logo`}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-bold">
                {coin.name}{" "}
                <span className="text-gray-400 font-medium">
                  {coin.symbol}/USD
                </span>
              </span>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {millify(coin.price)} USD
            </p>
            <div className="flex justify-between text-lg mt-4">
              <p>Market Cap: ${millify(coin.marketCap)}</p>
              <div
                className={`p-1 rounded-lg text-white ${
                  coin.change.charAt(0) === "-" ? "bg-red-600" : "bg-green-500"
                }`}
                title={coin.change.charAt(0) === "-" ? "loss" : "profit"}
              >
                {millify(Number(coin.change))}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoCurrencies;
