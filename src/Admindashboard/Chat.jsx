import React, { useState, useEffect } from 'react';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const Chat = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/graph');
        const data = await response.json();

        const { labels, amounts } = data;

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Fee Amount',
              data: amounts,
              fill: true,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  Chart.register(CategoryScale);

  return (
    <div>
      {chartData ? <Line data={chartData} /> : 'Loading chart data...'}
    </div>
  );
};

export default Chat;

