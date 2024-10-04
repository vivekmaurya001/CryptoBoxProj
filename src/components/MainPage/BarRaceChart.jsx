import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarRaceChart = ({ filteredCoins }) => {
  const [coinList, setCoinlist] = useState(filteredCoins);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      animation: true,
    },
    title: {
      text: "Cryptocurrency Market Cap",
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: "Market Cap (USD)",
      },
    },
    series: [
      {
        name: "Market Cap",
        data: [],
      },
    ],
    plotOptions: {
      series: {
        animation: {
          duration: 2000,
        },
      },
    },
  });
  const top10Coins = coinList?.slice(0, 10);
  console.log(coinList);

  const categories = top10Coins?.map((coin) => coin.name);
  const marketCapsWithColors = top10Coins?.map((coin) => ({
    y: parseFloat(coin.marketCap), // Market cap value
    color: coin.color, // Corresponding color for each bar
  }));
  useEffect(() => {
    // Prepare the data from your array of objects
    setChartOptions({
      chart: {
        type: "bar",
        backgroundColor: "transparent", // Set background transparent
      },
      title: {
        text: "Market Cap Distribution",
        style: {
          color: "#FFFFFF", // White text color for the title
        },
      },
      xAxis: {
        categories,
        labels: {
          style: {
            color: "#FFFFFF", // White text color for x-axis labels
          },
        },
      },
      yAxis: {
        title: {
          text: "Market Cap (USD)",
          style: {
            color: "#FFFFFF", // White text color for y-axis title
          },
        },
        labels: {
          style: {
            color: "#FFFFFF", // White text color for y-axis labels
          },
        },
      },
      series: [
        {
          name: "Market Cap",
          data: marketCapsWithColors, // Data with colors
        },
      ],
      tooltip: {
        shared: true,
        useHTML: true,
        formatter: function () {
          return `<strong> ${this.x}</strong>: $${
            this.y.toFixed(2) / 1000000
          } M`;
        },
      },
      plotOptions: {
        series: {
          animation: {
            duration: 2000,
          },
        },
      },
      credits: {
        enabled: false, // Disable the Highcharts logo
      },
    });
  }, []);

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default BarRaceChart;
