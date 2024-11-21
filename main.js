// xs < 576px
// sm ≥ 576px
// md ≥ 768px
// lg ≥ 992px
// xl ≥ 1200px
// xxl ≥ 1400px
import { makeId } from "./helpers/utils.js";
import "./services/project.js";
import "./components/Header/index.js";
import "./components/Sidebar/index.js";
import "./helpers/utils.js";
import "./components/BoardsContainer/index.js";
import "./components/Models/ViewTaskModel.js";
import "./components/Models/WarningModel.js";
import "./components/Main/index.js";
// import "./services/project.js";
import {
  addProjectInLocalStorage,
  deleteProject,
  getProjects,
  updateProjects,
} from "./services/project.js";

import { addBoardInLocalStorage } from "./services/board.js";
import { displayCurrentProjectName } from "./components/Main/index.js";
// addBoardInLocalStorage("my board", 81221);
let projectData = [
  {
    projectId: makeId(),
    projectName: "my project",
    board: [
      {
        boardId: makeId(),
        boardName: "my Board",
        tasks: {
          taskId: makeId(),
          taskName: "name",
          creationDate: "date",
          taskDescription: "description",
        },
      },

      {
        boardId: makeId(),
        boardName: "Name",
        tasks: {
          taskId: makeId(),
          taskName: "my Task",
          creationDate: "date",
          taskDescription: "description",
        },
      },

      {
        boardId: makeId(),
        boardName: "my task",
        tasks: {
          taskId: makeId(),
          taskName: "my Task",
          creationDate: "date",
          taskDescription: "description",
        },
      },
    ],
  },
];

// addProjectInLocalStorage("pro1");
// addProjectInLocalStorage("pro2");
// addProjectInLocalStorage("pro3");  console.log(projectNameElement.innerHTML);
// addProjectInLocalStorage("pro4");

// this function gives us the standard screen width size
// addProjectInLocalStorage("myProroro");

const resize = () => {
  let width = window.innerWidth;
  document.screenSize = {
    width,
    xs: 576,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  };
};

resize();
window.addEventListener("resize", resize);

window.addEventListener("storage", () => {
  // When local storage changes, dump the list to
  // the console.
  console.log("hello");
});

window.onstorage = () => {
  console.log("hello");
};

// window.onload = () => {
//   // const curantId = getLocalStorage("currentProjectIdFromSidebar")
//   displayCurrentProjectName();
//   // renderCurrentProject();
//   // render the sidebar
//   // render the heder
//   // render the main section
// };
