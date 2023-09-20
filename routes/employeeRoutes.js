// employeeRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');

// Employee registration
router.post('/register/employee', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const employee = new Employee({ username, password: hashedPassword });
  await employee.save();
  res.sendStatus(201); // Created
});

// Employee login
router.post('/login/employee', async (req, res) => {
  const { username, password } = req.body;
  const employee = await Employee.findOne({ username });
  if (!employee) {
    res.status(401).json({ message: 'Username not found' });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, employee.password);
  if (passwordMatch) {
    res.status(200).json({ message: 'Employee authenticated' });
  } else {
    res.status(401).json({ message: 'Password incorrect' });
  }
});

module.exports = router;
