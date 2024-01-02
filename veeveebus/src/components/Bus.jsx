import React, { useState } from 'react';
import './Bus.css';

const Bus = () => {
  const initialBusData = {
    id: '',
    name: '',
    capacity: '',
    servicedate: '',
    Kilometer: '',
    BusType: '',
    // Add more bus details as needed
  };

  const [busData, setBusData] = useState(initialBusData);
  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    console.log('Bus data:', busData);
    e.preventDefault();
    const validationErrors = validateForm(busData);

    if (Object.keys(validationErrors).length === 0) {


     try {

      const datatosend = {
        ...busData,
            id : parseInt(busData.id),
            capacity : parseInt(busData.capacity),
            Kilometer : parseInt(busData.Kilometer),
        }
      
        const response = await fetch('http://localhost:8080/addBus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datatosend),
        });

        if (response.ok) {
          // Reset the form
          setBusData(initialBusData);
          setErrors({});
          // Open the success modal
          setIsSuccessModalOpen(true);
        } else {
          // Handle error response from the server, if needed
          console.error('Failed to submit bus data to the server');
        }
      } catch (error) {
        console.error('Error while making the POST request:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (name, value) => {
    setBusData({
      ...busData,
      [name]: value,
    });
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.id) {
      errors.id = 'Bus ID is required';
    }

    if (!data.name) {
      errors.name = 'Bus name is required';
    }

    if (!data.capacity) {
      errors.capacity = 'Bus capacity is required';
    } else if (isNaN(data.capacity) || +data.capacity <= 0) {
      errors.capacity = 'Capacity must be a positive number';
    }

    if (!data.servicedate) {
      errors.servicedate = 'Service date is required';
    }

    if (!data.Kilometer) {
      errors.Kilometer = 'Kilometer is required';
    } else if (isNaN(data.Kilometer) || +data.Kilometer <= 0) {
      errors.Kilometer = 'Kilometer must be a positive number';
    }

    if (!data.BusType) {
      errors.BusType = 'Bus type is required';
    }

    // Add more validations for other bus details as needed

    return errors;
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="add-bus">
      <h2>Add a New Bus</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='id'>Bus ID:</label>
          <input
            id='id'
            type="text"
            name="id"
            value={busData.id}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          {errors.id && <div className="error">{errors.id}</div>}
        </div>
        <div>
          <label htmlFor='name'>Bus Name:</label>
          <input
            id='name'
            type="text"
            name="name"
            value={busData.name}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div>
          <label htmlFor='capacity'>Bus Capacity:</label>
          <input
            id='capacity'
            type="number"
            name="capacity"
            value={busData.capacity}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          {errors.capacity && <div className="error">{errors.capacity}</div>}
        </div>
        <div>
          <label htmlFor='servicedate'>Last Service Date:</label>
          <input
            id='servicedate'
            type="date"
            name="servicedate"
            value={busData.servicedate}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          {errors.servicedate && <div className="error">{errors.servicedate}</div>}
        </div>
        <div>
          <label htmlFor='Kilometer'>Total Kilometer:</label>
          <input
            id='Kilometer'
            type="number"
            name="Kilometer"
            value={busData.Kilometer}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
          {errors.Kilometer && <div className="error">{errors.Kilometer}</div>}
        </div>
        <div>
          <label htmlFor='BusType'>Bus Type:</label>
          <select
            id='BusType'
            name="BusType"
            value={busData.BusType}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          >
            <option value="">Select Bus Type</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
          {errors.BusType && <div className="error">{errors.BusType}</div>}
        </div>
        {/* Add more input fields for other bus details */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Success modal */}
      {isSuccessModalOpen && (
        <div className="success-modal">
          <p>Bus data submitted successfully!</p>
          <button onClick={closeSuccessModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Bus;