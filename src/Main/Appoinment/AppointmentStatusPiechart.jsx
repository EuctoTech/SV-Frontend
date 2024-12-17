import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const AppointmentStatusPiechart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [telecallData, setTelecallData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [debouncedData, setDebouncedData] = useState({}); 

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
          // You can add any required headers or authentication here
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
        setDebouncedData(data); 
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching telecall data:', error);
        setIsLoading(false);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); 

  useEffect(() => {
    const updateChart = () => {
      if (!isLoading && chartRef.current && telecallData.PendingCount && telecallData.ResolvedCount) {
        const data = {
          labels: ['Appointment Completed', 'Appointment Pending'],
          datasets: [
            {
              label: 'Patient Count',
              data: [telecallData.ResolvedCount, telecallData.PendingCount],
              backgroundColor: ['#FECF02', '#FF5773','#0091F7'],
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

export default AppointmentStatusPiechart;


