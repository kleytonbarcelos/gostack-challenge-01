projects = [
  {
    id: 1,
    title: "Create BackEnd",
    tasks: ["Create structure"]
  },
  {
    id: 2,
    title: "Create FrontEnd",
    tasks: ["Drawing pages"]
  },
  {
    id: 3,
    title: "Create App",
    tasks: ["Create firts scream"]
  }
];

let id = 3;
index = projects.findIndex(p => p.id == id);
projects[index].tasks.push("aaaaaaaaa");
console.log(projects);
