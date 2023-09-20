import React, { useState, useEffect } from 'react';
import './css/AdminDashboard.css'; // Import your custom CSS for styling
import AdminNavbar from './AdminNavbar';
import AdminRegistrationForm from './AdminRegistrationForm';
import EmployeeRegistrationForm from './EmployeeRegistrationForm';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('addSports'); // Default to 'addSports'
  const [sports, setSports] = useState([]);
  const [newSport, setNewSport] = useState('');
  const [bookingRequests, setBookingRequests] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [venues, setVenues] = useState([]);
  const [showEmployeeRegistration, setShowEmployeeRegistration] = useState(false);
  const [showAdminRegistration, setShowAdminRegistration] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    description: '',
    quantity: 0,
    sport: '', // Add a sport field to associate equipment with sports
  });
  const [newVenue, setNewVenue] = useState({
    name: '',
    duration: 0,
    sport: '', // Add a sport field to associate venues with sports
  });

  useEffect(() => {
    // Fetch booking requests based on the selectedSportId
    fetch(`/api/bookings`)
    .then((response) => response.json())
    .then((data) => {
      setBookingRequests(data);
    })
    .catch((error) => {
      console.error('Error fetching booking requests:', error);
    });
   
   
    
    // Fetch sports
    fetch('/api/sports')
      .then((response) => response.json())
      .then((data) => {
        setSports(data);
      })
      .catch((error) => {
        console.error('Error fetching sports:', error);
      });

    });
    
const fetchEquipmentAndVenues = (sportId) => {
  // Fetch equipment for the selected sport
  fetch(`/api/equipment/${sportId}`)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        // If data is an array with items, set equipment and quantities
        setEquipment(data);
      }
    })
    .catch((error) => {
      console.error('Error fetching equipment:', error);
    });

  // Fetch venues for the selected sport
  fetch(`/api/venues/${sportId}`)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setVenues(data);
      } else {
        setVenues([]);
      }
    })
    .catch((error) => {
      console.error('Error fetching venues:', error);
    });
};

// Modify handleSportChange to store the selected sport ID
const handleSportChange = (e) => {
  const selectedSportId = e.target.value;
  setNewSport(selectedSportId); // Store the selected sport ID
  fetchEquipmentAndVenues(selectedSportId); // Fetch equipment and venues for the selected sport
  
};


  const addSport = async () => {
    try {
      // Create a request body object
      const requestBody = {
        name: newSport,
      };

      // Make a POST request using fetch
      const response = await fetch('/api/sports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify(requestBody), // Convert the request body to JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      const responseData = await response.json();

      // Handle successful response (e.g., reset form fields, update sport state)
      setSports([...sports, responseData]); // Assuming the server returns the saved sport data
      setNewSport('');
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error adding sport:', error);
    }
  };

  const handleEquipmentChange = (e) => {
    const { name, value } = e.target;
    setNewEquipment({
      ...newEquipment,
      [name]: value,
    });
  };

  const addEquipment = async () => {
    try {
      // Create a request body object
      const requestBody = {
        name: newEquipment.name,
        description: newEquipment.description,
        quantity: newEquipment.quantity,
        sport: newEquipment.sport, // Associate equipment with the selected sport
      };

      // Make a POST request using fetch
      const response = await fetch(`/api/equipment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify(requestBody), // Convert the request body to JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      const responseData = await response.json();

      // Handle successful response (e.g., reset form fields, update equipment state)
      setEquipment([...equipment, responseData]); // Assuming the server returns the saved equipment data
      setNewEquipment({
        name: '',
        description: '',
        quantity: 0,
        sport: '', // Reset the sport association field
      });
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error adding equipment:', error);
    }
  };

  const handleVenueChange = (e) => {
    const { name, value } = e.target;
    setNewVenue({
      ...newVenue,
      [name]: value,
    });
  };

  const addVenue = async () => {
    try {
      // Create a request body object
      const requestBody = {
        name: newVenue.name,
        duration: newVenue.duration,
        sport: newVenue.sport, // Associate venue with the selected sport
      };

      // Make a POST request using fetch
      const response = await fetch('/api/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify(requestBody), // Convert the request body to JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      const responseData = await response.json();

      // Handle successful response (e.g., reset form fields, update venue state)
      setVenues([...venues, responseData]); // Assuming the server returns the saved venue data
      setNewVenue({
        name: '',
        duration: 0,
        sport: '', // Reset the sport association field
      });
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error adding venue:', error);
    }
  };
  const handleBookingApproval = async (bookingId) => {
    try {
      // Make a PUT request to approve the booking request
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the UI to reflect the approved status
      const updatedRequests = bookingRequests.map((request) =>
        request._id === bookingId ? { ...request, status: 'approved' } : request
      );
      setBookingRequests(updatedRequests);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error approving booking request:', error);
    }
  };
  const handleRegisterEmployee = () => {
    setActiveSection('employeeregistration')
    setShowEmployeeRegistration(true);
  };

  const handleRegisterAdmin = () => {
    setActiveSection('adminregistration'); // Update the activeSection
    setShowAdminRegistration(true);
  };

  const closeRegistrationModal = () => {
    setShowEmployeeRegistration(false);
    setShowAdminRegistration(false);
  };


  const handleLogout = () => {
    // Implement your logout logic here, e.g., clearing authentication tokens or session
    // Redirect the user to the login page
    window.location.href = '/'; // You may need to adjust the URL
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
      <AdminNavbar onSectionChange={setActiveSection}  onLogout={handleLogout} onRegisterEmployee={handleRegisterEmployee}
          onRegisterAdmin={handleRegisterAdmin} />
      </div>
     
      {/* Section to Add Sports */}
      {activeSection === 'addSports' && (
      <div className="admin-section">
        <h3 className="form-title">Add Sports</h3>
        <div className="form-input">
          <label htmlFor="sportName">Sport Name</label>
          <input
            type="text"
            id="sportName"
            value={newSport}
            onChange={handleSportChange}
          />
        </div>
        <button className="roleButton" onClick={addSport}>
          Add Sport
        </button>
        {/* Display the list of all sports */}
        <div >
            <h3 className="form-title">List of All Sports</h3>
            <ul>
              {sports.map((sport) => (
                <li className="listt" key={sport._id}>
                  {sport.name}
                </li>
              ))}
            </ul>
          </div>
      </div>
      )}

      {/* Section to Add Sports Equipment */}
      {activeSection === 'addEquipment' && (
      <div className="admin-section">
        <h3 className="form-title">Add Sports Equipment</h3>
        <form>
          <div className="form-input">
            <label htmlFor="equipmentName">Equipment Name</label>
            <input
              type="text"
              id="equipmentName"
              name="name"
              value={newEquipment.name}
              onChange={handleEquipmentChange}
            />
          </div>
          <div className="form-input">
            <label htmlFor="equipmentDescription">Description</label>
            <textarea
              id="equipmentDescription"
              name="description"
              value={newEquipment.description}
              onChange={handleEquipmentChange}
            ></textarea>
          </div>
          <div className="form-input">
            <label htmlFor="equipmentQuantity">Quantity</label>
            <input
              type="number"
              id="equipmentQuantity"
              name="quantity"
              value={newEquipment.quantity}
              onChange={handleEquipmentChange}
            />
          </div>
          <div className="form-input">
            <label htmlFor="equipmentSport">Sport</label>
            <select
              className='selectSport'
              id="equipmentSport"
              name="sport"
              value={newEquipment.sport}
              onChange={handleEquipmentChange}
            >
              <option value="">Select a sport</option>
              {sports.map((sport) => (
                <option key={sport._id} value={sport._id}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
          <button className="roleButton" type="button" onClick={addEquipment}>
            Add Equipment
          </button>
        </form>
      </div>
      )}

      {/* Section to Add Venues */}
      {activeSection === 'addVenue' && (
      <div className="admin-section">
        <h3 className="form-title">Add Venues</h3>
        <form>
          <div className="form-input">
            <label htmlFor="venueName">Venue Name</label>
            <input
              
              type="text"
              id="venueName"
              name="name"
              value={newVenue.name}
              onChange={handleVenueChange}
            />
          </div>
          <div className="form-input">
            <label htmlFor="venueDuration">Duration (minutes)</label>
            <input
              type="number"
              id="venueDuration"
              name="duration"
              value={newVenue.duration}
              onChange={handleVenueChange}
            />
          </div>
          <div className="form-input">
            <label htmlFor="venueSport">Sport</label>
            <select
             className='selectSport'
              id="venueSport"
              name="sport"
              value={newVenue.sport}
              onChange={handleVenueChange}
            >
              <option value="">Select a sport</option>
              {sports.map((sport) => (
                <option key={sport._id} value={sport._id}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
          <button className="roleButton" type="button" onClick={addVenue}>
            Add Venue
          </button>
        </form>
         
      </div>
      )}

      {/* Section to Manage Booking Requests */}
      {activeSection === 'manageBookings' && (
      <div className="admin-section">
        <h3 className="form-title">Manage Booking Requests</h3>
        <ul>
          {bookingRequests.map((request) => (
            <li key={request._id}>
              <strong>Sport:</strong> {request.sport.name}<br />
              <strong>Venue:</strong> {request.venue}<br />
              <strong>Start Time:</strong> {request.startTime}<br />
              <strong>Status:</strong> {request.status}<br />
             
              {request.status === 'pending' && (
                <button
                  className="roleButton"
                  onClick={() => handleBookingApproval(request._id)}
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      )}
      
      {activeSection === 'listEquipment' && (
      <div>
      <div className="admin-section">
        <h3 className="form-title">Select a Sport</h3>
        <select
         className='selectSport'
          id="selectSport"
          value={newSport.value}
          onChange={(e) => handleSportChange(e)}
        >
          <option value="">Select a sport</option>
          {sports.map((sport) => (
            <option key={sport._id} value={sport._id}>
              {sport.name}
            </option>
          ))}
        </select>
      </div>
   

      {/* Display the list of added equipment */}
      <div className="admin-section">
        <h3 className="form-title">List of Sports Equipment</h3>
        <ul>
          {equipment.map((item) => (
            <li className='listt' key={item._id}>
              <strong>Name:</strong> {item.name}<br />
              <strong>Description:</strong> {item.description}<br />
              <strong>Quantity:</strong> {item.quantity}<br />
              <strong>Sport:</strong> {sports.find((sport) => sport._id === item.sport)?.name}
            </li>
          ))}
        </ul>
      </div>
      </div>
      )}


      
      {/* Display the list of added venues */}
      {activeSection === 'listVenues' && (
      <div>
      <div>
      <div className="admin-section">
        <h3 className="form-title">Select a Sport</h3>
        <select
         className='selectSport'
          id="selectSport"
          value={newSport.value}
          onChange={(e) => handleSportChange(e)}
        >
          <option value="">Select a sport</option>
          {sports.map((sport) => (
            <option key={sport._id} value={sport._id}>
              {sport.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="admin-section">
        <h3 className="form-title">List of Venues</h3>
        <ul>
          {venues.map((venue) => (
            <li className='listt' key={venue._id}>
              <strong>Name:</strong> {venue.name}<br />
              <strong>Duration:</strong> {venue.duration} minutes<br />
              <strong>Sport:</strong> {sports.find((sport) => sport._id === venue.sport)?.name}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
      )}
      {/* Modal for Employee Registration */}
      {activeSection === 'employeeregistration' && (
        <>
      {showEmployeeRegistration && (

        <div className="registration-modal admin-section">
          {/* Add your employee registration form here */}
          <EmployeeRegistrationForm/>
          <button onClick={closeRegistrationModal}>Close</button>
        </div>
      )}
      </>
      )}

      {/* Modal for Admin Registration */}
      {activeSection === 'adminregistration' && (
        <>
      {showAdminRegistration && (
        <div className="registration-modal admin-section">
          {/* Add your admin registration form here */}
          <AdminRegistrationForm/>
          <button onClick={closeRegistrationModal}>Close</button>
        </div>
      )}
      </>
      )}
    </div>
  );
};

export default AdminDashboard;