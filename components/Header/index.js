// this function is called when the user clicks on the button and the button is clicked
import { addProjectInLocalStorage } from "../../services/project.js";
import {
  previewProjectsNameOnTheSidebar,
  renderCurrentProject,
} from "../Sidebar/index.js";
import { getLocalStorage } from "../../helpers/localStorage.js";
import { setLocalStorage } from "../../helpers/localStorage.js";
import { addError, isValidString, removeError } from "../../helpers/utils.js";
import { previewBoardsOnTheMainPage } from "../BoardsContainer/index.js";
// show/show side bar when screen width get to a cretin size
const sidebarMenuBtnHandler = () => {
  const sidebar = getElement(".sidebar");

  document.addEventListener("pointerdown", (e) => {
    const { width: screenWidth, md } = document.screenSize;
    if (screenWidth > md) {
      sidebar.style.display = "";
      return;
    }
    sidebar.style.display =
      e.target.closest(".burger-icon") || e.target.closest(".sidebar")
        ? "block"
        : "none";
  });
};

//name is self explanatory
const HandilingAddNewProjectPopUp = () => {
  const defaultBoards = {
    done: "Done",
    "in-Progress": "In Progress",
    "To-Do": "To Do",
  };
  const newProjectBtn = getElement(".new-project");
  const popUpContainer = getElement(".pop-up-container");
  const customSelect = getElement(".custom-select");
  const selectBtn = getElement(".select-button > span");
  const selectedValue = getElement(".selected-value");
  const projectsList = getElement(".projects-list");
  const arrow = getElement("#projects-nav img");
  const addNewProjectForm = document.forms.newProjectForm;
  const projectNameInput = addNewProjectForm.elements.projectNameInput;
  const NewUserGuidStep1 = getElement(".new-user-guid-step1");

  //this event is responsible for showing/hiding the pop up
  newProjectBtn.addEventListener("click", (e) => {
    popUpContainer.style.display = "flex";
    projectNameInput.focus();
    NewUserGuidStep1.classList.add("hide");
  });

  popUpContainer.addEventListener("click", (e) => {
    if (e.target.closest(".close-icon")) {
      popUpContainer.style.display = "none";
      displayCheckedBoards = [];
      projectNameInput.value = "";
      checkedBoards.forEach((boardID) => {
        let checkBox = document.getElementById(boardID);
        checkBox.removeAttribute("checked");
      });
      displayCheckedBoards = [];
      selectBtn.textContent = "Select Boards";
    }
    let isOpen = true;
    if (!e.target.closest(".active") && isOpen) {
      customSelect.classList.remove("active");
      selectBtn.parentElement.style.borderRadius = "5px";

      isOpen = false;
    }
  });
  // add click event to select button
  selectBtn.parentElement.addEventListener("click", (e) => {
    // add/remove active class on the container element
    customSelect.classList.toggle("active");
    selectBtn.parentElement.style.borderRadius = "5px 5px 0 0";
    // update the aria-expanded attribute based on the current state
    selectBtn.setAttribute(
      "aria-expanded",
      selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
  });

  let checkedBoards = [];
  let displayCheckedBoards = [];
  popUpContainer.addEventListener("click", (e) => {
    //here we get the checkBoxes

    if (e.target.className == "check-box") {
      let checkBox = e.target;
      //here we make the check boxes functioning and we push them into an array
      if (checkBox.hasAttribute("checked")) {
        let indeXOfBoard = displayCheckedBoards.findIndex(
          (boardID) => boardID == defaultBoards[checkBox.id]
        );
        displayCheckedBoards.splice(indeXOfBoard, 1);
        checkedBoards = checkedBoards.filter((id) => id !== checkBox.id);
        checkBox.removeAttribute("checked");
      } else {
        checkBox.setAttribute("checked", "");
        displayCheckedBoards.push(defaultBoards[checkBox.id]);
        checkedBoards.push(checkBox.id);
      }
      selectBtn.textContent = displayCheckedBoards.join(", ");
      if (!displayCheckedBoards.length) {
        selectedValue.textContent = "select Boards";
      }
    }
  });

  let boards = [];
  const errorMsg = document.createElement("div");
  errorMsg.classList.add("error-message");

  errorMsg.style.left = "44px";
  projectNameInput.onblur = function () {
    if (!isValidString(projectNameInput.value)) {
      addError(
        projectNameInput,
        errorMsg,
        "*Please Enter a Valid Name Only 'a-z A-Z 0-9'"
      );
    } else if (projectNameInput.value === "") {
      addError(projectNameInput, errorMsg, "*Project Name Cannot Be Empty");
    } else if (projectNameInput.value.length > 80) {
      addError(
        projectNameInput,
        errorMsg,
        "*Project Name Must Be less than '80' characters"
      );
    }
  };

  projectNameInput.onfocus = function () {
    projectNameInput.style.border = "";

    removeError(projectNameInput, errorMsg);
  };
  addNewProjectForm.addEventListener("submit", (e) => {
    if (!isValidString(projectNameInput.value)) {
      addError(
        projectNameInput,
        errorMsg,
        "*Please Enter a Valid Name Only 'a-z A-Z 0-9'"
      );
      e.preventDefault();

      return;
    } else if (projectNameInput.value === "") {
      addError(projectNameInput, errorMsg, "*Project Name Cannot Be Empty");
      e.preventDefault();

      return;
    } else if (projectNameInput.value.length > 80) {
      addError(
        projectNameInput,
        errorMsg,
        "*Project Name Must Be less than '80' characters"
      );
      e.preventDefault();

      return;
    }
    e.preventDefault();

    checkedBoards.forEach((boardId) => {
      false;
      boards.push(defaultBoards[boardId]);
    });

    addProjectInLocalStorage(projectNameInput.value, boards);
    setLocalStorage("isNewUser", false);

    const projects = getLocalStorage("projects") || [];
    let projectId = projects[projects.length - 1].ProjectId;
    previewProjectsNameOnTheSidebar();
    renderCurrentProject(projectId);
    previewBoardsOnTheMainPage();
    console.log(boards);

    boards = [];
    console.log(boards);
    let projectNameElement = document.getElementById(projectId);
    projectNameElement.classList = "selected-project";

    popUpContainer.style.display = "none";
    projectNameInput.value = "";
    checkedBoards.forEach((boardID) => {
      let checkBox = document.getElementById(boardID);
      checkBox.removeAttribute("checked");
      checkBox.parentElement.innerHTML = checkBox.parentElement.innerHTML + "";
    });
    projectsList.style.display = "";
    arrow.className = "arrow-up";
    displayCheckedBoards = [];
    checkedBoards = [];
    localStorage.setItem("projectsDisplayStatsInTheSideBar", "");
    localStorage.setItem("sidebarArrowStats", "arrow-up");

    selectBtn.textContent = "Select Boards";
  });
};

const init = () => {
  sidebarMenuBtnHandler();
  HandilingAddNewProjectPopUp();
};

init();
