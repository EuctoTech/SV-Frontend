import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['Appointment Completed', 'Appointment Pending'],
      datasets: [
        {
          label: 'Patient Count',
          data: [300, 100],
          // backgroundColor: ['#D1AA5C', '	rgb(50,205,50)'],
          backgroundColor: ['rgb(50,205,50)', '	rgb(205,92,92)'],
          hoverOffset: 4,
        },
      ],
    };

    const config = {
      type: 'pie',
      data: data,
    };

    if (chartInstance.current) {
      // If chartInstance already exists, destroy it before creating a new one.
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, config);
    }

    // Cleanup: Destroy the chart when the component unmounts.
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default PieChart;
