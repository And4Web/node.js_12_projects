const path = require('path');
const Project = require('../models/project');

exports.fetchAllProjects = async (req, res) => {
   // res.send("Index route")
   const renderPath = path.join(__dirname, '..','views', 'home.hbs');
   try {
     const projects = await Project.find({},{__v:0});
     console.log("All Projects >>> ", projects);
     res.render(renderPath, {projects: projects});
   } catch (error) {
    console.log("Error >>> ", error.message);
    res.render('renderPath', {error: error.message});
   }
}