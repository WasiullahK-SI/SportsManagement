import React, { useState } from 'react';

const EmployeeRegistrationForm = () => {
  const [employeeInfo, setEmployeeInfo] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfo({ ...employeeInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/employee/register/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeInfo),
      });
  
      if (response.status === 201) {
        // Registration successful, you can redirect or display a success message
        console.log('Employee registration successful');
      } else if (response.status === 400) {
        // Username already exists, handle the error
        console.error('Username already exists');
      } else {
        // Handle other errors
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div className="registration-form">
      <h2 className='form-title'> Employee Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="employeeUsername">Username</label>
          <input
            type="text"
            id="employeeUsername"
            name="username"
            value={employeeInfo.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="employeePassword">Password</label>
          <input
            type="password"
            id="employeePassword"
            name="password"
            value={employeeInfo.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={employeeInfo.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default EmployeeRegistrationForm;
