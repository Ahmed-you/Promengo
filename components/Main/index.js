import {
  getLocalStorage,
  setLocalStorage,
} from "../../helpers/localStorage.js";
import {
  getProjectById,
  deleteProject,
  updateProjects,
} from "../../services/project.js";
import { previewProjectsNameOnTheSidebar } from "../Sidebar/index.js";
import { renderCurrentProject } from "../Sidebar/index.js";
let proName = document.querySelector(".project-name");
//  AA!243232
const threeDotsIcon = document.querySelector(".three-dots-icon");
const redDeleteIcon = document.querySelector(".red-delete-icon");
const greenTrueIcon = document.querySelector(".green-true-icon");
let wantedProject;
export const viewProjectNameOnMainPage = () => {
  wantedProject = getProjectById(
    getLocalStorage("currentProjectIdFromSidebar")
  );
  if (!wantedProject) {
    proName.textContent = "NoProjectsYet";
    threeDotsIcon.classList.add("hide");
  } else {
    proName.textContent = wantedProject.projectName;
    threeDotsIcon.classList.remove("hide");
  }
};
const actionMenuContainer = document.querySelector(".actions-container");
export const deleteProjectUiAction = (deletedId) => {
  let projects = getLocalStorage("projects");
  const project = projects.find((item) => item.ProjectId == deletedId);
  let currantIndex = projects.indexOf(project);

  if (currantIndex == 0 && projects.length > 1) {
  } else {
    currantIndex--;
  }

  projects = deleteProject(deletedId);

  const newId = currantIndex < 0 ? null : projects[currantIndex].ProjectId;

  renderCurrentProject(newId);
  previewProjectsNameOnTheSidebar();

  const liElement = document.getElementById(newId);

  if (liElement) {
    liElement.classList.add("selected-project");
  }
};

let actionForm = document.forms["actionForm"]["edit-project-name-input"];

const editProjectUiAction = () => {
  //copied code
  let EditProjectNameInput = actionForm;
  wantedProject = getProjectById(
    getLocalStorage("currentProjectIdFromSidebar")
  );
  EditProjectNameInput.value = wantedProject.projectName;
  function isValidString(input) {
    const regex = /^[a-zA-Z0-9 ]*$/;
    return regex.test(input);
  }
  let errorMSG = document.createElement("div");

  errorMSG.style.color = "red";
  errorMSG.style.fontSize = "11px";
  errorMSG.style.fontWeight = "500";
  errorMSG.style.position = "absolute";
  errorMSG.style.left = " 305px";
  errorMSG.style.top = " 80px";

  const lableForProjectNameInput = document.querySelector(
    ".lable-for-project-name-input"
  );
  EditProjectNameInput.onblur = function () {
    if (!isValidString(EditProjectNameInput.value)) {
      errorMSG.textContent = "*Please Enter a Valid Name Only 'a-z A-Z 0-9'";

      EditProjectNameInput.style.border = "1px red solid";
      EditProjectNameInput.before(errorMSG);
    }

    if (EditProjectNameInput.value == "") {
      errorMSG.textContent = "*Project Name Can Not Be Empty'";

      EditProjectNameInput.before(errorMSG);
      EditProjectNameInput.style.border = "1px red solid";
    }
  };

  EditProjectNameInput.onfocus = function () {
    EditProjectNameInput.style.border = "";

    errorMSG.remove();
  };
  //end of copied code

  proName.replaceWith(EditProjectNameInput);
  setTimeout(() => {
    EditProjectNameInput.focus();
  }, 0);
  threeDotsIcon.classList.add("hide");
  greenTrueIcon.classList.remove("hide");
  redDeleteIcon.classList.remove("hide");

  greenTrueIcon.addEventListener("pointerdown", () => {
    if (!isValidString(EditProjectNameInput.value)) return;
    let currentProjectId = getLocalStorage("currentProjectIdFromSidebar");

    updateProjects(currentProjectId, EditProjectNameInput.value);
    threeDotsIcon.classList.remove("hide");
    greenTrueIcon.classList.add("hide");
    redDeleteIcon.classList.add("hide");

    proName.textContent = EditProjectNameInput.value;
    previewProjectsNameOnTheSidebar();
    const liElement = document.getElementById(currentProjectId);
    liElement.classList.add("selected-project");

    EditProjectNameInput.replaceWith(proName);
  });
  redDeleteIcon.addEventListener("pointerdown", () => {
    threeDotsIcon.classList.remove("hide");
    redDeleteIcon.classList.add("hide");
    greenTrueIcon.classList.add("hide");
    EditProjectNameInput.replaceWith(proName);
  });
};

document.addEventListener("pointerdown", (e) => {
  if (e.target.closest(".delete")) {
    let currentId = getLocalStorage("currentProjectIdFromSidebar");

    deleteProjectUiAction(currentId);
  }
  if (e.target.closest(".three-dots-icon")) {
    actionMenuContainer.classList.toggle("show");
  } else if (e.target.className != "three-dots-icon") {
    actionMenuContainer.classList.remove("show");
  }
  if (e.target.closest(".edit")) {
    editProjectUiAction();
  }
});

const init = () => {
  viewProjectNameOnMainPage();
  // deleteProjectUiAction();
};
init();
