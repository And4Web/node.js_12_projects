const path = require('path');
const Project = require('../models/project');

const getProjectDetails = async (req, res) => {
  const renderPath = path.join(__dirname, '..','views', 'projects',  'singleProject.hbs');

  try {
    const projectId = req.params.projectId;

    const project = await Project.findById(projectId);
    
    console.log("project details >>> ", project);

    if(!project){
      console.log("No Project found with project Id >>> ", projectId);
      res.render(renderPath, {error: `No Project found with project id: ${projectId}`})
    }else{
      const {title, service, client, description, url, projectImage} = project;
      const date = project.date.toDateString();
      res.render(renderPath, {title, service, client, description, date, projectImage,url});
    }    
  } catch (error) {
    console.log("Single Project Page Error >>> ", error.message);
    res.render(renderPath, {error: error.message});
  }
}

module.exports = {
  getProjectDetails
}