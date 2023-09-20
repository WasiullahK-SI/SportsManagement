const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
  const Employee = mongoose.model('Employee', employeeSchema);
  module.exports =  Employee;