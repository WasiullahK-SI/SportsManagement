import React from 'react';

const AdminNavbar = ({ onSectionChange, onLogout, onRegisterEmployee, onRegisterAdmin }) => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-options">
        <button onClick={() => onSectionChange('addSports')}>Add Sports</button>
      </div>
      <div className="sidebar-options">
        <button onClick={() => onSectionChange('addVenue')}>Add Venue</button>
      </div>
      <div className="sidebar-options">
        <button onClick={() => onSectionChange('addEquipment')}>Add Equipment</button>
      </div>
      <div className="sidebar-options">
        <button onClick={() => onSectionChange('manageBookings')}>Manage Bookings</button>
      </div>
      <div className="sidebar-options">
        <button onClick={() => onSectionChange('listEquipment')}>List of Equipments</button>
      </div>
      <div className="sidebar-options">
        <button onClick={() => onSectionChange('listVenues')}>List of Venues</button>
      </div>
      <div className="sidebar-options">
      <button className="admin-navbar-button"  onClick={onRegisterEmployee} > Register Employee </button>
      </div>
      <div className="sidebar-options">
      <button className="admin-navbar-button" onClick={onRegisterAdmin}> Register Admin </button>
      </div>
      
      <div className="sidebar-options logout-button">
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminNavbar;
