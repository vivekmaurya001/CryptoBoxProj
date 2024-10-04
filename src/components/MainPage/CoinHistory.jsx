import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CoinHistory = ({ coinHistory, coinId, CoinArray }) => {
  const CoinObj = CoinArray?.find((obj) => obj.uuid === coinId);
  const coinPrice = [];
  const coinTimestamp = [];

  function timestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate.replace(",", "");
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    const price = parseFloat(coinHistory?.data?.history[i].price);
    const timestamp = timestampToDate(coinHistory?.data?.history[i].timestamp);

    // Only push if both price and timestamp are valid
    if (!isNaN(price) && price !== undefined && timestamp !== undefined) {
      coinPrice.push(price);
      coinTimestamp.push(timestamp);
    }
  }

  const minPrice = Math.min(...coinPrice);
  const maxPrice = Math.max(...coinPrice);

  const options = {
    chart: {
      type: "area", // Change to 'area' for gradient fill
      backgroundColor: "transparent",
    },
    title: {
      text: `${CoinObj?.name} Price History`,
      style: {
        color: "#fff", // Optional: Set title color to white for contrast
      },
    },
    xAxis: {
      categories: coinTimestamp,
      title: {
        text: "Date",
        style: {
          color: "#D3D3D3", // Bright grey color for x-axis title
        },
      },
      labels: {
        style: {
          color: "#D3D3D3", // Bright grey color for x-axis labels
        },
      },
    },
    yAxis: {
      title: {
        text: "Price (USD)",
        style: {
          color: "#D3D3D3", // Bright grey color for y-axis title
        },
      },
      labels: {
        style: {
          color: "#D3D3D3", // Bright grey color for y-axis labels
        },
      },
      min: minPrice,
      max: maxPrice,
    },
    tooltip: {
      enabled: true,
      shared: true,
      useHTML: true, // Allow HTML in the tooltip
      formatter: function () {
        const point = this.points[0]; // Get the first point from the shared tooltip
        return `
          <div style="text-align: center;">
            <img src="${CoinObj?.iconUrl}" alt="${
          CoinObj?.name
        }" style="width: 30px; height: 30px; margin-right: 5px;" />
            <strong>Price:</strong> $${point.y.toFixed(2)}</br>
            <strong>Date:-</strong> ${point.x}
          </div>
        `;
      },
    },
    series: [
      {
        name: `${CoinObj?.name} Price`,
        data: coinPrice,
        color: CoinObj?.color, // Line color
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0, // Start gradient at the top (on the line)
            x2: 0,
            y2: 1, // End gradient at the bottom (towards x-axis)
          },
          stops: [
            [0, Highcharts.color(CoinObj?.color).setOpacity(1).get("rgba")], // Full color at the line
            [1, Highcharts.color(CoinObj?.color).setOpacity(0).get("rgba")], // Fully transparent at the bottom
          ],
        },
        tooltip: {
          valuePrefix: "$",
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              enabled: false,
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default CoinHistory;
