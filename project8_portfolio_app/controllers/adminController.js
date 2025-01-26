const path = require('path');
const Project = require('../models/project');


// admn home route
const getAdminHome = async (req, res)=>{
  // res.send("Admin route")
  const renderPath = path.join(__dirname, '..', 'views', 'admin', 'index.hbs');
  try {
    const projects = await Project.find({}, {__v:0});
    res.render(renderPath, {projects: projects});
  } catch (error) {
    console.log("error >>> ", error.message);
    res.render(renderPath, {error: error.message});
  }
} 

// Add project - admin/add - admin only
const addProject = async (req, res) => {
  const renderPath = path.join(__dirname, '..', 'views', 'admin', 'add.hbs');
  try {
   const {title, service, client, description, url, projectdate} = req.body;

   let validationErrors = [];

   if(req.validationErrors){
    validationErrors = req.validationErrors
   }
   let newProject;

   if(!req.file){
    validationErrors.push("Project Image is required")
   }else{
    newProject = {title, service, client, description, url, projectdate};   
    newProject.projectImage = req.file.filename;
   }

   if(validationErrors.length > 0){
    console.log("errors inside >>> ", validationErrors)
    res.render(renderPath, {errors: validationErrors});
   }else{
      await Project.create(newProject);
      console.log("<<< New project created >>> ")
      // res.redirect('/admin/add');
      // res.location('/admin/add');
      res.render(renderPath, {success: newProject})
   }    
  } catch (error) {
    console.log('Error catch >>> ', error.message);
    res.render(renderPath, {error: error.message})
  }
}

module.exports = {
  addProject,
  getAdminHome,
}