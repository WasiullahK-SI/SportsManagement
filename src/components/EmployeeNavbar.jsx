
import React, { useState } from 'react';
import  './css/EmployeeDashboard.css';


const EmployeeNavbar = ({ onSearch, onBookingsClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = () => {
      // Call the onSearch function from the parent component (EmployeeDashboard)
      // Pass the searchQuery as an argument to filter equipment and venues
      onSearch(searchQuery);
    };
  
    return (
      <div className="employee-navbar">
        <div className="navbar-left">
        <div className="company-info">
        {/* <img src={companyLogo} alt="Company Logo" className="company-logo" /> */}
        
          <span className="company-name">Sportz Interactive</span>
        </div>
          
          
          
        </div>
        
            <div className="navbar-right">
            <button className="role-button empnavbook" onClick={onBookingsClick} style={{ background: 'none' }}>Bookings</button>
            <div className="search-bar-container">
                <input
                type="text"
                className="search-bar"
                placeholder="Search Equipment"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>
                    &#128269; {/* Magnifying glass icon */}
                    </button>
                </div>
            </div>
        </div>
   
      
    );
  };
  
  export default EmployeeNavbar;
