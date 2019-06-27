const express = require("express");
const server = express();

server.use(express.json());

projects = [
  {
    id: 1,
    title: "Create BackEnd",
    tasks: []
  },
  {
    id: 2,
    title: "Create FrontEnd",
    tasks: []
  },
  {
    id: 3,
    title: "Create App",
    tasks: []
  }
];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Method: ${req.method} Params: ${req.url}`);
  next();
  console.timeEnd("Request");
});

function checkUser(req, res, next) {
  if (projects.findIndex(p => p.id == req.params.id) == -1) {
    return res.status(400).json({ error: "Project not found" });
  }
  return next();
}
function checkProjectInDb(req, res, next) {
  if (projects.findIndex(p => p.id == req.body.id) == -1) {
    return res
      .status(400)
      .json({ error: "This project does not exists in DB" });
  }
  return next();
}
//###########################################
server.get("/projects", (req, res) => {
  return res.json(projects);
});
server.get("/projects/:id", checkUser, (req, res) => {
  project = projects.filter(e => e.id == req.params.id);
  return res.json(project);
});
server.post("/projects", (req, res) => {
  projects.push(req.body);
  return res.json(projects);
});
server.post("/projects/savetask", checkProjectInDb, (req, res) => {
  index = projects.findIndex(p => p.id == req.body.id);
  projects[index].tasks.push(req.body.task);
  return res.json(projects);
});
server.put("/projects", checkProjectInDb, (req, res) => {
  projects.splice(projects.findIndex(e => e.id == req.body.id), 1);
  projects.push(req.body);
  return res.json(projects);
});
server.delete("/projects", checkProjectInDb, (req, res) => {
  projects.splice(projects.findIndex(e => e.id == req.body.id), 1);
  return res.send();
});
//###########################################
server.listen(3000);
