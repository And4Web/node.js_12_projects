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


// Edit, Delete Routes
const getEditProject = async (req, res) => {
  const renderPath = path.join(__dirname, '..', 'views', 'admin', 'edit.hbs');
  try {
    const {projectId} = req.params;
    const project = await Project.findById(projectId); 
    const {title, service, description, projectdate, url, projectImage, client} = project;

    res.render(renderPath, {projectId, title, service, description, projectdate, url, projectImage, client});
  } catch (error) {
    console.log("project edit error >>> ", error.message);
    res.render(renderPath, {editPageError: error.message});
  }
}

const editProject = async (req, res) => {
  const renderPath = path.join(__dirname, '..', 'views', 'admin', 'index.hbs');
  try {
    const {projectId} = req.params;
    const {title, service, client, description, projectdate, projectImage} = req.body;
    await Project.updateOne({_id: projectId}, {title, service, client, description, projectdate, projectImage});

    await Project.save()

    const updatedProject = await Project.findById(projectId);
    console.log("updated Project >>> ", updatedProject);

    res.render(renderPath, {projectId, title:updatedProject.title, service:updatedProject.service, description:updatedProject.description, projectdate:updatedProject.projectdate, projectImage:updatedProject.projectImage, client:updatedProject.client});
  } catch (error) {
    console.log("project edit error >>> ", error.message);
    res.render(renderPath, {editPageError: error.message});
  }
}

const deleteProject = async (req, res) => {}



module.exports = {
  addProject,
  getAdminHome,
  editProject,
  deleteProject,
  getEditProject,
}