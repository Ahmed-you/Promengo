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
import { isValidString } from "../../helpers/utils.js";

let projectNameElement = getElement(".project-name");
const threeDotsIcon = getElement(".three-dots-icon");
const redDeleteIcon = getElement(".red-delete-icon");
const greenTrueIcon = getElement(".green-true-icon");
let selectedProject;
export const displayCurrentProjectName = () => {
  const projectId = getLocalStorage("currentProjectIdFromSidebar");
  const selectedProject = getProjectById(projectId);

  if (!selectedProject) {
    projectNameElement.textContent = "NoProjectsYet";
    threeDotsIcon.classList.add("hide");
  } else {
    projectNameElement.textContent = selectedProject.projectName;
    threeDotsIcon.classList.remove("hide");
  }
};
const actionMenuContainer = getElement(".actions-container");
export const deleteProjectUiAction = (deletedId) => {
  let projects = getLocalStorage("projects");
  let currentIndex = projects.findIndex(
    (item) => item.ProjectId === deletedId
  );

  if (currentIndex == 0 && projects.length > 1) {
  } else {
    currentIndex--;
  }

  projects = deleteProject(deletedId);

  const newProjectId =
    currentIndex < 0 ? null : projects[currentIndex]?.ProjectId;
  renderCurrentProject(newProjectId);
  previewProjectsNameOnTheSidebar();

  const liElement = document.getElementById(newProjectId);

  if (liElement) {
    liElement.classList.add("selected-project");
  }
};

let actionForm = document.forms["actionForm"]["edit-project-name-input"];

const editProjectUiAction = () => {
  //copied code
  let EditProjectNameInput = actionForm;
  selectedProject = getProjectById(
    getLocalStorage("currentProjectIdFromSidebar")
  );
  EditProjectNameInput.value = selectedProject.projectName;
  isValidString();

  const errorMsg = document.createElement("div");
  errorMsg.className = "error-message";

  function addError(inputElement, message) {
    errorMsg.textContent = message;
    inputElement.style.border = "1px solid red";
    inputElement.before(errorMsg);
  }

  function removeError(inputElement) {
    inputElement.style.border = "";
    errorMsg.remove();
  }

  EditProjectNameInput.onblur = function () {
    if (!isValidString(EditProjectNameInput.value)) {
      addError(
        EditProjectNameInput,
        "*Please Enter a Valid Name Only 'a-z A-Z 0-9'"
      );
    } else if (EditProjectNameInput.value === "") {
      addError(EditProjectNameInput, "*Project Name Cannot Be Empty");
    }
  };

  EditProjectNameInput.onfocus = function () {
    removeError(EditProjectNameInput);
  };
  //end of copied code

  projectNameElement.replaceWith(EditProjectNameInput);
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

    projectNameElement.textContent = EditProjectNameInput.value;
    previewProjectsNameOnTheSidebar();
    const liElement = document.getElementById(currentProjectId);
    liElement.classList.add("selected-project");

    EditProjectNameInput.replaceWith(projectNameElement);
  });
  redDeleteIcon.addEventListener("pointerdown", () => {
    threeDotsIcon.classList.remove("hide");
    redDeleteIcon.classList.add("hide");
    greenTrueIcon.classList.add("hide");
    EditProjectNameInput.replaceWith(projectNameElement);
  });
};
document.addEventListener("pointerdown", handleClick);

function handleClick(e) {
  const { target } = e;

  if (target.closest(".delete")) {
    let currentId = getLocalStorage("currentProjectIdFromSidebar");

    deleteProjectUiAction(currentId);
  }
  if (target.closest(".three-dots-icon")) {
    actionMenuContainer.classList.toggle("show");
  } else if (target.className != "three-dots-icon") {
    actionMenuContainer.classList.remove("show");
  }
  if (e.target.closest(".edit")) {
    editProjectUiAction();
  }
}

const init = () => {
  displayCurrentProjectName();
  // deleteProjectUiAction();
};
init();
