import React, { useState } from "react";
import { Pagination } from "antd";
import millify from "millify";
import { Sparklines, SparklinesLine } from "react-sparklines";

const MarketUpdate = ({ CoinArray }) => {
  const [count, setcount] = useState(10);
  const [currentPage, setcurrentPage] = useState(1);

  const handlePageChange = (page, pageSize) => {
    if (page > currentPage) {
      setcount(count + 10);
    } else {
      setcount(count - 10);
    }
    setcurrentPage(page);
  };
  return (
    <div className="flex flex-col gap-4 mt-4 p-6 text-white bg-[#1c1c1c] rounded-md items-center">
      <div className="flex justify-around w-full h-[60px] text-xl md:text-2xl border-b-4 border-gray-500">
        <div className="w-1/4"># Name</div>
        <div className="w-1/4">Last Price</div>
        <div className="w-1/6">Change</div>
        <div className="w-1/6">Market Cap</div>
        <div>Last 20 Days</div>
      </div>
      {CoinArray?.slice(count - 10, count).map((coin, i) => (
        <div
          class="flex justify-between w-full text-base md:text-xl border-b border-gray-400 hover:bg-gray-800 cursor-pointer"
          key={i}
        >
          <div class="flex gap-2 font-semibold w-1/3">
            <span>{coin.rank}</span>
            <img
              class="w-10 h-10 rounded-full"
              src={coin.iconUrl}
              alt={`${coin.name} icon`}
            />
            <span>{coin.name}</span>
            <span class="text-gray-400">{coin.symbol}</span>
          </div>

          <div class="w-1/6 font-bold">
            ${Math.round(coin.price * 100) / 100}
          </div>

          <div
            class={`w-1/12 text-${
              coin.change.charAt(0) === "-" ? "red-500" : "blue-500"
            }`}
          >
            {coin.change}
          </div>

          <div class="w-1/6 font-bold">${millify(coin.marketCap)}</div>

          <div class="w-1/6 overflow-hidden text-xl md:text-2xl">
            <Sparklines
              data={coin.sparkline
                .filter((value) => value !== null && value !== undefined)
                .slice(0, 20)}
              svgWidth={150}
              limit={20}
              svgHeight={50}
            >
              <SparklinesLine
                color={coin.change.charAt(0) === "-" ? "red" : "green"}
              />
            </Sparklines>
          </div>
        </div>
      ))}
      <div className="w-[350px] flex justify-center bg-gradient-to-r from-[#8456af] to-[#37cdbb]  p-3 rounded-lg">
        <Pagination
          style={{
            fontSize: "23px",
            fontWeight: "600",
          }}
          defaultCurrent={1} // Initial page number
          total={30} // Total number of items
          onChange={handlePageChange} // Callback when page changes
        />
      </div>
    </div>
  );
};

export default MarketUpdate;
