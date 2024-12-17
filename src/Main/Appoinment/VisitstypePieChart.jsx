import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const VisitstypePieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [telecallData, setTelecallData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false); // Track whether a fetch is in progress
  const [debouncedData, setDebouncedData] = useState({}); // State for debounced data

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await fetch('https://euctostaging.com/prolife/api/telecall/count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 429) {
          console.error('API rate limit exceeded. Please try again later.');
          setIsLoading(false);
          setIsFetching(false);
          return;
        }

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTelecallData(data);
        setDebouncedData(data); // Set debounced data here
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching telecall data:', error);
        setIsLoading(false);
      } finally {
        setIsFetching(false);
      }
    };

    // Call the fetchData function only once when the component mounts
    fetchData();

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    // Function to update the chart
    const updateChart = () => {
      if (!isLoading && chartRef.current && telecallData.PendingCount && telecallData.ResolvedCount) {
        const data = {
          labels: ['No.of Visit', 'No.of non-Visit'],
          datasets: [
            {
              label: 'Patient Count',
              data: [telecallData.ResolvedCount, telecallData.PendingCount],
              backgroundColor: ['#88E0B0', '#E512A3'],
              // backgroundColor: ['rgb(50,205,50)', 'rgb(205,92,92)'],
              hoverOffset: 4,
            },
          ],
        };

        const config = {
          type: 'pie',
          data: data,
          options: {
            maintainAspectRatio: false,
            aspectRatio: 1,
          },
        };

        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(chartRef.current, config);
      }
    };

    // Update the chart when debounced data changes
    updateChart();
  }, [debouncedData, isLoading]);


  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <canvas ref={chartRef} style={{ height: '250px' }} />
      )}
    </div>
  );
};

export default VisitstypePieChart;


