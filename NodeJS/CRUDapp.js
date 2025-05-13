const fs = require("fs");
const filepath = "./tasks.json";
const command = process.argv[2];
const task = process.argv[3];

function loadtask() {
  try {
    const databuffer = fs.readFileSync(filepath);
    const dataJSON = databuffer.toString();
    const dataarray = JSON.parse(dataJSON);
    return dataarray;
  } catch (error) {
    return [];
  }
}

function savetask(tasklist) {
  const dataJSONnew = JSON.stringify(tasklist);
  fs.writeFileSync(filepath, dataJSONnew);
}

function addtask(task) {
  let tasklist = loadtask();
  tasklist.push({ task });
  savetask(tasklist);
  console.log("task added successfully!");
}

function listtask() {
  let tasklist = loadtask();
  tasklist.forEach((task, index) => {
    console.log(`${index + 1} - ${task.task}`);
  });
}

function deletetask(tasktoremove) {
  let tasklist = loadtask();
  const index = tasklist.findIndex((task) => task.task === tasktoremove);
  if (index !== -1) {
    tasklist.splice(index, 1);
    savetask(tasklist);
    console.log("task deleted successfully!");
  }
}

if (command === "add") {
  addtask(task);
} else if (command === "list") {
  listtask();
} else if (command === "delete") {
  deletetask(task);
} else {
  console.log("command not found");
}
