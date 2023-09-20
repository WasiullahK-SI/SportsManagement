// App.js
import React from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AdminLoginForm from './components/AdminLoginForm';
import AdminDashboard from './components/AdminDashboard'; // Import the AdminDashboard component
import EmployeeLoginForm from './components/EmployeeLoginForm';
import EmployeeDashboard from './components/EmployeeDashboard'; // Import the EmployeeDashboard component
// import Navbar from './components/Navbar'; // Import the Navbar component
import './components/styles.css';





function App() {
  
  return (
    <Router>
      <div>
       {/* <Navbar />  Add the Navbar component   */}
        <Switch>
          <Route path="/admin-login">
            <AdminLoginForm />
          </Route>
          <Route path="/admin-dashboard">
            <AdminDashboard />
          </Route>
          <Route path="/employee-login">
            <EmployeeLoginForm />
          </Route>
          <Route path="/employee-dashboard">
            <EmployeeDashboard />
          </Route>
          <Route path="/">
            <LoginForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
