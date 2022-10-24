import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { httpGetBTCHistory } from "../utils/requests";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const initialState = {
  labels: ["a", "b"],
  datasets: [{ label: "PokeCoin", data: [1, 2] }],
};

const down = (ctx, value) =>
  ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

const fetchChartData = async (callback) => {
  const res = await httpGetBTCHistory();
  const usdPrices = res.chart.map((array) => (array[1] / 100000).toFixed(8));
  const formattedDates = res.chart.map((array) => {
    const newDate = new Date(array[0] * 1000);
    return newDate.toLocaleString("en-US", { month: "short", day: "numeric" });
  });

  callback({
    labels: formattedDates,
    datasets: [
      {
        label: "PokeCoin",
        data: usdPrices,
        color: "white",
        borderColor: "#24cc97",
        segment: {
          borderColor: (ctx) => down(ctx, "#fa5e7a"),
        },
        spanGaps: true,
      },
    ],
  });
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      grid: {
        drawBorder: false,
        color: "#555",
      },
      ticks: {
        color: "white",
      },
    },
    x: {
      grid: {
        drawBorder: false,
        color: "transparent",
      },
      ticks: {
        color: "white",
      },
    },
  },
};

const LineChart = () => {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    fetchChartData(setData);
  }, []);

  return (
    <div className="chart-container">
      <h2>Price of 1000 PokeCoins in the last 30 days in USD</h2>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
