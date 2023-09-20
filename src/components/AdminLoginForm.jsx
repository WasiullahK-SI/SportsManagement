import React, { useState } from 'react';
import './styles.css'; // Import the stylesheet
import { useHistory } from 'react-router-dom';

const AdminLoginForm = () => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the admin credentials to your backend for authentication
    const response = await fetch('/api/admin/login/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: adminUsername, password: adminPassword }),
    });

    if (response.status === 200) {
      // Successful login, navigate to the admin dashboard using history.push
      history.push('/admin-dashboard');
    } else {
      // Debugging: Check if login failure block is executed
      const data = await response.json(); // Assuming the server sends an error message in JSON format
      setAdminError(data.message); // Set the error message from the response
      console.log('Login failed');
      // Handle login failure
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
        {adminError && <p className="error-message">{adminError}</p>}

          <label htmlFor="adminUsername">Admin Username</label>
          <input
            type="text"
            id="adminUsername"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="adminPassword">Password</label>
          <input
            type="password"
            id="adminPassword"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
