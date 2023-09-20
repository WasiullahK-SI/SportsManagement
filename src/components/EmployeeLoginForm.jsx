import React, { useState } from 'react';
import './styles.css'; // Import the stylesheet
import { useHistory } from 'react-router-dom';

const EmployeeLoginForm = () => {
  const [employeeUsername, setEmployeeUsername] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');
  const [employeeError, setEmployeeError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the employee credentials to your backend for authentication
    const response = await fetch('/api/employee/login/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: employeeUsername, password: employeePassword }),
    });

    if (response.status === 200) {
      // Successful login, navigate to the employee dashboard using history.push
      history.push('/employee-dashboard');
    } else {
      // Debugging: Check if login failure block is executed
      const data = await response.json(); // Assuming the server sends an error message in JSON format
      setEmployeeError(data.message); // Set the error message from the response
      console.log('Login failed');
      // Handle login failure
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Employee Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
        {employeeError && <p className="error-message">{employeeError}</p>}
          <label htmlFor="employeeUsername">Employee Username</label>
          <input
            type="text"
            id="employeeUsername"
            value={employeeUsername}
            onChange={(e) => setEmployeeUsername(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="employeePassword">Password</label>
          <input
            type="password"
            id="employeePassword"
            value={employeePassword}
            onChange={(e) => setEmployeePassword(e.target.value)}
          />
        </div>
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default EmployeeLoginForm;
