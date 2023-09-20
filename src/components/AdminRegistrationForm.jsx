import React, { useState } from 'react';

const AdminRegistrationForm = () => {
  const [adminInfo, setAdminInfo] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo({ ...adminInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/register/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminInfo),
      });
  
      if (response.status === 201) {
        // Registration successful, you can redirect or display a success message
        console.log('Admin registration successful');
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
      <h2 className='form-title'>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="adminUsername">Username</label>
          <input
            type="text"
            id="adminUsername"
            name="username"
            value={adminInfo.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="adminPassword">Password</label>
          <input
            type="password"
            id="adminPassword"
            name="password"
            value={adminInfo.password}
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
            value={adminInfo.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AdminRegistrationForm;
