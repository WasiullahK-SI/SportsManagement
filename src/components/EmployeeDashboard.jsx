import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './css/EmployeeDashboard.css';
import Select from 'react-select';
import EmployeeNavbar from './EmployeeNavbar.jsx'; // Keep this import with other imports
import companyLogo from './img/company-logo.jpg';

const socket = io('http://localhost:5000'); 


const EmployeeDashboard = () => {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [equipment, setEquipment] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [equipmentQuantities, setEquipmentQuantities] = useState({});
  const [practiceTime, setPracticeTime] = useState('');
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [showBookings, setShowBookings] = useState(false); // Track whether to show bookings
  // const [selectedDuration, setSelectedDuration] = useState(0);
  const [approvedBookings, setApprovedBookings] = useState([]);

  useEffect(() => {
    // Connect to the WebSocket server when the component mounts
    socket.connect();

    // Handle real-time notifications
    socket.on('notification', (message) => {
      console.log('Received notification:', message);
      // Update the UI or show a notification to the employee
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Fetch approved bookings when the component mounts
    fetch('/api/bookings')
      .then((response) => response.json())
      .then((data) => {
        setApprovedBookings(data);
      })
      .catch((error) => {
        console.error('Error fetching approved bookings:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch sports
    fetch('/api/sports')
      .then((response) => response.json())
      .then((data) => {
        setSports(data);
      })
      .catch((error) => {
        console.error('Error fetching sports:', error);
      });
  }, []);

  console.log(selectedVenue.value);

  useEffect(() => {
    // Fetch equipment and venues based on the selected sport
    if (selectedSport) {
      
      fetch(`/api/equipment/${selectedSport.value}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            // If data is an array with items, set equipment and quantities
            setEquipment(data);
  
            const initialQuantities = {};
            data.forEach((item) => {
              initialQuantities[item.name] = 0;
            });
            setEquipmentQuantities(initialQuantities);
          } else {
            // If data is empty or not an array, handle it gracefully
            setEquipment([]); // Set equipment as an empty array
            setEquipmentQuantities({}); // Reset equipment quantities
            alert('No equipment available for the selected sport.');
          }
        })
        .catch((error) => {
          console.error('Error fetching equipment:', error);
        });
  
      fetch(`/api/venues/${selectedSport.value}`)
        .then((response) => response.json())
        .then((data) => {
          // Check if data is an array before setting it
          if (Array.isArray(data)) {
            setVenues(data);
          } else {
            setVenues([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching venues:', error);
        });
    }
  }, [selectedSport]);
  
  

  const sportOptions = sports.map((sport) => ({
    value: sport._id,
    label: sport.name,
  }));

  const equipmentOptions = equipment.map((item) => ({
    value: item.name,
    label: `${item.name} (Quantity: ${item.quantity})`,
  }));

  const handleSportChange = (selectedOption) => {
    setSelectedSport(selectedOption);
  };

  const handleEquipmentChange = (selectedOptions) => {
    setSelectedEquipment(selectedOptions);
  };

 
  const handleBookingsClick = () => {
    // When "Bookings" is clicked, set showBookings to true
    setShowBookings(true);
  };

  const handleQuantityChange = (equipmentName, quantity) => {
    // Update the quantity for the selected equipment
    setEquipmentQuantities((prevQuantities) => ({
      ...prevQuantities,
      [equipmentName]: quantity,
    }));
  };



  // const handleBookVenue = () => {
    // if (selectedVenue && practiceTime) {
    //   // Create a new Date object using the selected time input
    //   const selectedTimeParts = practiceTime.split(":");
    //   const practiceStartTime = new Date();
    //   practiceStartTime.setHours(selectedTimeParts[0]);
    //   practiceStartTime.setMinutes(selectedTimeParts[1]);
    //   // const bookingData = {
    //   //   date: practiceStartTime.toISOString().split('T')[0], // Get the date in "YYYY-MM-DD" format
    //   //   time: practiceTime, // Use the selected time as is
    //   // };
  
    //   // Ensure that selectedVenue.value contains the ObjectId of the venue
    //   console.log(selectedVenue)
    //   const venueId = selectedVenue.value; // Make sure this is the correct ObjectId
  
    //   // Prepare the selected equipment data with both equipment and quantity
    //   const selectedEquipmentData = selectedEquipment.map((equipment) => ({
    //     equipment: equipment.value, // Make sure this contains the correct equipment ObjectId
    //     quantity: equipmentQuantities[equipment.value],
    //   }));
  
  //     fetch("/api/bookings", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         sport: selectedSport.value,
  //         venue:  venueId, // Use the ObjectId of the venue
  //         startTime: practiceStartTime,
  //         selectedEquipment: selectedEquipmentData,
  //         status: 'pending',
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // Display a message indicating that the request has been sent
  //         alert('Booking request sent. Awaiting admin approval.');
  //         setIsBookingConfirmed(true);
  //       })
  //       .catch((error) => {
  //         console.error('Error sending booking request:', error);
  //       });
  //   } else {
  //     alert('Please select a sport, venue, and specify practice timings.');
  //   }
  // };

  const handleBookVenue = () => {
    if (selectedVenue && practiceTime) {
      const selectedTimeParts = practiceTime.split(":");
      const practiceStartTime = new Date();
      practiceStartTime.setHours(selectedTimeParts[0]);
      practiceStartTime.setMinutes(selectedTimeParts[1]);
      const venueId = selectedVenue.value; // Make sure this is the correct ObjectId
      const selectedEquipmentData = selectedEquipment.map((equipment) => ({
            equipment: equipment.value, // Make sure this contains the correct equipment ObjectId
            quantity: equipmentQuantities[equipment.value],
          }));
  
      // Find the selected venue and its duration
      const selectedVenueData = venues.find((venue) => venue.name === selectedVenue.value);
  
      if (selectedVenueData) {
        const venueDuration = selectedVenueData.duration; // Get the venue's duration in minutes
  
        // Calculate the endTime by adding the venue's duration to startTime
        const practiceEndTime = new Date(practiceStartTime.getTime() + venueDuration * 60000); // 60000 milliseconds in a minute
  
        // Check for overlapping bookings in the approvedBookings data
        const overlappingBooking = approvedBookings.find((booking) => {
          if (
            booking.venue === selectedVenue.value &&
            (
              (practiceStartTime >= booking.startTime && practiceStartTime < booking.endTime) ||
              (practiceEndTime > booking.startTime && practiceEndTime <= booking.endTime)
            )
          ) {
            return true; // There is an overlap
          }
          return false;
        });
  
        if (overlappingBooking) {
          alert('This venue has already been booked for the selected time.');
        } else {
          // Proceed with booking
          fetch("/api/bookings", {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    sport: selectedSport.value,
                    venue:  venueId, // Use the ObjectId of the venue
                    startTime: practiceStartTime,
                    selectedEquipment: selectedEquipmentData,
                    status: 'pending',
                  }),
                })
                .then((response) => response.json())
                .then((data) => {
                    // Display a message indicating that the request has been sent
                    alert('Booking request sent. Awaiting admin approval.');
                    setIsBookingConfirmed(true);
                  })
                  .catch((error) => {
                    console.error('Error sending booking request:', error);
                  });
            }
              
      } else {
        alert('Selected venue data not found.');
      }
    } else {
      alert('Please select a sport, venue, and specify practice timings.');
    }
  };
  

  const handleSearch = (searchQuery) => {
    // Filter equipment and venues based on the search query
    console.log('Equipment:', equipment);
    console.log('Venues:', venues);
    const filteredEquipment = equipment.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredVenues = venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filteredEquipment);
    console.log(filteredVenues)

    // Combine filtered results into a single array
    const combinedResults = [
      ...filteredEquipment.map((item) => ({
        type: 'Equipment',
        name: item.name,
        sport: sports.find((sport) => sport._id === item.sport)?.name,
        quantity: item.quantity,
      })),
      ...filteredVenues.map((venue) => ({
        type: 'Venue',
        name: venue.name,
        sport: sports.find((sport) => sport._id === venue.sport)?.name,
      })),
    ];

    // Set the search results in the state
    setSearchResults(combinedResults);
  };
  
  
  
  

  return (
    <div className="employee-dashboard ">
      <div className="navbar-onBoard">
        <EmployeeNavbar onSearch={handleSearch}  onBookingsClick={handleBookingsClick} />
        </div>
   {showBookings ? (
    <>

      <div className="sport-section employee-section">
        <h3 className="form-title">Choose a Sport</h3>
        <Select
          className="optionSport"
          options={sportOptions}
          value={selectedSport}
          onChange={handleSportChange}
          placeholder="Select a sport"
        />
      </div>
      {selectedSport && (
        <>
          <div className="equipment-section employee-section">
            <h3 className="form-title">Available Sports Equipment</h3>
            <Select
              className="optionEquipment"
              isMulti
              options={equipmentOptions}
              value={selectedEquipment}
              onChange={handleEquipmentChange}
              placeholder="Select equipment"
            />
            {selectedEquipment.map((equipment) => (
              <div key={equipment.value} className="equipment-quantity">
                <label htmlFor={`quantity-${equipment.value}`}>
                  {equipment.value} Quantity:
                </label>
                <input
                  type="number"
                  id={`quantity-${equipment.value}`}
                  value={equipmentQuantities[equipment.value]}
                  onChange={(e) =>
                    handleQuantityChange(equipment.value, parseInt(e.target.value))
                  }
                  min={0}
                />
              </div>
            ))}
          </div>
          <div className="venue-section employee-section ">
            <h3 className="form-title">Choose a Venue</h3>
            <Select
              className="optionEquipment"
              options={venues.map((venue) => ({
                value: venue.name,
                label: `${venue.name} (Duration: ${venue.duration} minutes)`,
              }))}
              value={selectedVenue}
              onChange={setSelectedVenue}
              placeholder="Select a venue"
            />
          </div>
          <div className="employee-section ">
            <h3 className="form-title">Book a Venue</h3>
            <div className="form-input">
              <label htmlFor="practiceTime">Practice Start Time:</label>
              <input
                type="time"
                id="practiceTime"
                value={practiceTime}
                onChange={(e) => setPracticeTime(e.target.value)}
              />
            </div>
            <button className="role-button" onClick={handleBookVenue}>
              Book
            </button>
          </div>
    
          {/* //Display booking confirmation
           {isBookingConfirmed && (
            <div className="employee-section">
              <p>
                Booking confirmed for {selectedVenue.value} from {practiceTime} (Duration:{' '}
                {venues.find((venue) => venue.name === selectedVenue.value)?.duration} minutes).
              </p>
            </div>
          )}  */}
        </>
      )};
      </>
        ) : (
          <div className="welcome-page">
          <img src={companyLogo} alt="Company Logo" className="company-logo" />
          <h1 className='welcome-text'>Welcome to Sportz Interactive</h1>
          
        </div>
        )}
  
    </div>
  );
};

export default EmployeeDashboard;
