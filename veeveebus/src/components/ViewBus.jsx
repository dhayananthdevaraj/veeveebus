import React, { useState, useEffect } from 'react';
import './ViewBus.css';

const ViewBus = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    // Fetch bus data from the backend when the component mounts
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/getAllBus', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }); // Replace with your backend API endpoint for getting bus data
        if (response.ok) {
          const data = await response.json();
          setBuses(data); // Set the retrieved bus data in the state
        } else {
          console.error('Failed to fetch bus data from the server');
        }
      } catch (error) {
        console.error('Error while fetching bus data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="view-bus">
      <h2>Available Buses in Gargage</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Service Date</th>
            <th>Kilometer</th>
            <th>Bus Type</th>
            {/* Add more table headers for other bus details */}
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>

              <td>{bus.name}</td>
              <td>{bus.capacity}</td>
              <td>{bus.servicedate}</td>
              <td>{bus.Kilometer}</td>
              <td>{bus.BusType}</td>
              {/* Add more table cells for other bus details */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBus;