// LoginForm.js
import React, { useState } from 'react';
import AdminLoginForm from './AdminLoginForm'; // Import the AdminLoginForm component
import EmployeeLoginForm from './EmployeeLoginForm'; // Import the EmployeeLoginForm component
import './styles.css'; // Import the stylesheet
import CompanyLogo from './img/company-logo.jpg' //Import company logo

const LoginForm = () => {
    const [role, setRole] = useState(null);
  
    const selectAdminRole = () => setRole('admin');
    const selectEmployeeRole = () => setRole('employee');
  
    const renderLogin = () => {
      if (role === 'admin') {
        return <AdminLoginForm />;
      } else if (role === 'employee') {
        return <EmployeeLoginForm />;
      } else {
        return (
          <div className="role-bottons">
            <button className="role-botton" onClick={selectAdminRole}>
              Login as Admin
            </button>
            <button className="role-botton" onClick={selectEmployeeRole}>
              Login as Employee
            </button>
          </div>
        );
      }
    };
  
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="logo">
            <img className="logo" src={CompanyLogo} alt="Company Logo" />
            <span className='logo-title up'>Sportz </span>
            <span className='logo-title down'>Interactive</span>
          </div>
          {role === null && ( // Conditionally render the login title
            <h2 className="login-title">Login</h2>
          )}
          {renderLogin()}
          <div className="powered-by">
            Powered by Darwin Box
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginForm;