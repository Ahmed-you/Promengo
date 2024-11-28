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
import { isValidString, addError, removeError } from "../../helpers/utils.js";
import { previewBoardsOnTheMainPage } from "../BoardsContainer/index.js";
const projectNameElement = getElement(".project-name");
const threeDotsIcon = getElement(".three-dots-icon");
const redDeleteIcon = getElement(".red-delete-icon");
const greenTrueIcon = getElement(".green-true-icon");
const newProjectBtn = getElement(".new-project");
const NewUserGuidStep1 = getElement(".new-user-guid-step1");
let selectedProject;
let validProjectName;

// this function resposapilty is for displaying the project name on the main page
export const displayCurrentProjectName = () => {
  const isNewUser =
    getLocalStorage("isNewUser") != null ? getLocalStorage("isNewUser") : true;

  const projectId = getLocalStorage("currentProjectIdFromSidebar");
  const selectedProject = getProjectById(projectId);
  if (!selectedProject) {
    projectNameElement.textContent = "NoProjectsYet";
    threeDotsIcon.classList.add("hide");
    if (isNewUser) {
      newProjectBtn.style.zIndex = 10;
      NewUserGuidStep1.classList.remove("hide");
    }
  } else {
    projectNameElement.textContent = selectedProject.projectName;
    threeDotsIcon.classList.remove("hide");
    NewUserGuidStep1.classList.add("hide");
    newProjectBtn.style.zIndex = 0;
  }
};

//this function responsible for deletion
const actionMenuContainer = getElement(".actions-container");
export const deleteProjectUiAction = (deletedId) => {
  let projects = getLocalStorage("projects");
  let currentIndex = projects.findIndex((item) => item.ProjectId === deletedId);

  if (currentIndex == 0 && projects.length > 1) {
  } else {
    currentIndex--;
  }

  projects = deleteProject(deletedId);

  const newProjectId =
    currentIndex < 0 ? null : projects[currentIndex]?.ProjectId;
  renderCurrentProject(newProjectId);
  previewProjectsNameOnTheSidebar();
  previewBoardsOnTheMainPage();
  const liElement = document.getElementById(newProjectId);

  if (liElement) {
    liElement.classList.add("selected-project");
  }
};

let actionForm = document.forms["actionForm"]["edit-project-name-input"];

const editProjectUiAction = () => {
  let EditProjectNameInput = actionForm;
  selectedProject = getProjectById(
    getLocalStorage("currentProjectIdFromSidebar")
  );
  EditProjectNameInput.value = selectedProject.projectName;
  isValidString();

  const errorMsg = document.createElement("div");
  errorMsg.classList.add("error-message");
  errorMsg.style.bottom = "47px";
  errorMsg.style.left = "-11px";

  EditProjectNameInput.onblur = function () {
    validProjectName = false;

    if (!isValidString(EditProjectNameInput.value)) {
      addError(
        EditProjectNameInput,
        errorMsg,
        "*Please Enter a Valid Name Only 'a-z A-Z 0-9'"
      );
    } else if (EditProjectNameInput.value === "") {
      addError(EditProjectNameInput, errorMsg, "*Project Name Cannot Be Empty");
      console.log(EditProjectNameInput.value.length);
    } else if (EditProjectNameInput.value.length > 80) {
      addError(
        EditProjectNameInput,
        errorMsg,
        "*Board Name Must Be less than '80' characters"
      );
    }
    validProjectName = true;
  };

  EditProjectNameInput.onfocus = function () {
    removeError(EditProjectNameInput);
  };

  EditProjectNameInput.onsubmit = () => {
    if (validProjectName) {
    }
  };

  projectNameElement.replaceWith(EditProjectNameInput);
  setTimeout(() => {
    EditProjectNameInput.focus();
  }, 200);
  threeDotsIcon.classList.add("hide");
  greenTrueIcon.classList.remove("hide");
  redDeleteIcon.classList.remove("hide");

  greenTrueIcon.addEventListener("pointerdown", handleTrueIconClick);

  function handleTrueIconClick(e) {
    if (!isValidString(EditProjectNameInput.value)) {
      addError(
        EditProjectNameInput,
        errorMsg,
        "*Please Enter a Valid Name Only 'a-z A-Z 0-9'"
      );
      return;
    } else if (EditProjectNameInput.value === "") {
      addError(EditProjectNameInput, errorMsg, "*Project Name Cannot Be Empty");
      console.log(EditProjectNameInput.value.length);
      return;
    } else if (EditProjectNameInput.value.length > 80) {
      addError(
        EditProjectNameInput,
        errorMsg,
        "*Board Name Must Be less than '80' characters"
      );
      return;
    }

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
    removeError(EditProjectNameInput, errorMsg);
  }

  document.addEventListener("pointerdown", CancelEditClick);
  const cancelEditActions = () => {
    threeDotsIcon.classList.remove("hide");
    redDeleteIcon.classList.add("hide");
    greenTrueIcon.classList.add("hide");
    EditProjectNameInput.replaceWith(projectNameElement);
    removeError(EditProjectNameInput, errorMsg);
  };
  function CancelEditClick(e) {
    const { target } = e;
    if (target.closest(".red-delete-icon")) {
      cancelEditActions();
    } else if (target.closest(".projects-list li")) {
      cancelEditActions();
    } else if (target.closest(".new-project")) {
      cancelEditActions();
    }
  }
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
  if (target.closest(".edit")) {
    editProjectUiAction();
  }
}

const init = () => {
  displayCurrentProjectName();
  // deleteProjectUiAction();
};
init();
