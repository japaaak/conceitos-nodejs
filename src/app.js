const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body; 

  const project = { 
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({});
  };

  const project = {
    id,
    title,
    url,
    techs,
    "likes":repositories[projectIndex].likes
  };

  repositories[projectIndex] = project;
  return response.json(project);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({});
  };

  repositories.splice(projectIndex, 1);
  return response.status(204).json({});
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const index = repositories.findIndex(project => project.id === id);

  if(index < 0) {
    return response.status(400).json({});
  };

  const getLikes = {
    ...repositories[index],
    likes: repositories[index].likes + 1
  };
  repositories[index] = getLikes;

  return response.json(getLikes);
});

module.exports = app;
