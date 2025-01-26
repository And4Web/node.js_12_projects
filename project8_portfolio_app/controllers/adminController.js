const path = require('path');


// Add project - admin/add - admin only
const addProject = async (req, res) => {
  try {
   console.log("Request >>> ", req.body, req.file);
    
  } catch (error) {
    console.log('Error >>> ', error.message);
  }
}

module.exports = {
  addProject
}