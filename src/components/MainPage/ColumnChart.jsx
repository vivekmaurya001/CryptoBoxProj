import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ColumnChart = ({ coinData }) => {
  // Limit to first 10 coins
  const limitedCoinData = coinData?.slice(0, 10);

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "24-Hour Volume Distribution of Coins",
      style: {
        color: "#fff",
      },
    },
    xAxis: {
      categories: limitedCoinData?.map((coin) => coin.name),
      title: {
        text: "Coins",
        style: {
          color: "#D3D3D3",
        },
      },
      labels: {
        style: {
          color: "#D3D3D3",
        },
      },
    },
    yAxis: {
      title: {
        text: "24-Hour Volume (USD)",
        style: {
          color: "#D3D3D3",
        },
      },
      labels: {
        style: {
          color: "#D3D3D3",
        },
      },
    },
    series: [
      {
        name: "Volume",
        data: limitedCoinData?.map((coin) => ({
          y: parseFloat(coin["24hVolume"]), // Use the volume value
          color: coin.color, // Use the color from the coin object
        })),
      },
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        return `<strong>${this.x}</strong>: $${this.y.toFixed(2) / 1000000} M`;
      },
    },
    credits: {
      enabled: false, // Disable the Highcharts logo
    },
  };

  return (
    <div className="w-full  h-1/3">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ColumnChart;
