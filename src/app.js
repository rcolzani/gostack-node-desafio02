var uuid = require('uuid');
const express = require("express");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const newRepo = { id: uuid.v4(), title, url, techs, likes: 0 };

  repositories.push(newRepo);

  return response.status("200").json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  let repository = repositories.find(r => r.id == id);

  if (!repository) {
    return response.status(400).send();
  }

  repository.title = title;
  repository.url = url;
  repository.techs = techs;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(r => r.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).send();
  }
  repositories.splice(repositoryIndex);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  let repository = repositories.find(r => r.id == id);

  if (!repository) {
    return response.status(400).send(); //.json({ 'error': 'Repository not found' });
  }

  repository.likes++;
  return response.json(repository);
});

module.exports = app;
