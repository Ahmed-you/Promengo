// this function is called when the user clicks on the button and the button is clicked
import { addProjectInLocalStorage } from "../../services/project.js";
import {
  previewProjectsNameOnTheSidebar,
  renderCurrentProject,
} from "../Sidebar/index.js";
import { getLocalStorage } from "../../helpers/localStorage.js";
import { setLocalStorage } from "../../helpers/localStorage.js";
// show/show side bar when screen width get to a cretin size
const sidebarMenuBtnHandler = () => {
  const sidebar = document.querySelector(".sidebar");

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
  const newProjectBtn = document.querySelector(".new-project");
  const popUpContainer = document.querySelector(".pop-up-container");
  const customSelect = document.querySelector(".custom-select");
  const selectBtn = document.querySelector(".select-button > span");
  const selectedValue = document.querySelector(".selected-value");
  const projectsList = document.querySelector(".projects-list");
  const arrow = document.querySelector("#projects-nav img");

  //this event is responsible for showing/hiding the pop up
  newProjectBtn.addEventListener("click", (e) => {
    popUpContainer.style.display = "flex";
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
    if (e.target.closest("li")) {
      let li = e.target.closest("li");
      let checkBox = li.firstElementChild;
      //here we make the check boxes functioning and we push them into an array
      if (checkBox.hasAttribute("checked")) {
        let indeXOfBoard = displayCheckedBoards.findIndex(
          (boardID) => boardID == defaultBoards[checkBox.id]
        );
        displayCheckedBoards.splice(indeXOfBoard, 1);

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

  let addNewProjectForm = document.forms.newProjectForm;
  let projectNameInput = addNewProjectForm.elements.projectNameInput;

  let boards = [];
  function isValidString(input) {
    const regex = /^[a-zA-Z0-9 ]*$/;
    return regex.test(input);
  }
  let errorMSG = document.createElement("div");

  errorMSG.style.color = "red";
  errorMSG.style.fontSize = "11px";
  errorMSG.style.fontWeight = "500";
  errorMSG.style.position = "absolute";
  errorMSG.style.left = "44px";
  errorMSG.style.top = "2px";
  const lableForProjectNameInput = document.querySelector(
    ".lable-for-project-name-input"
  );
  projectNameInput.onblur = function () {
    errorMSG.textContent = "*Please Enter a Valid Name Only 'a-z A-Z 0-9'";

    if (!isValidString(projectNameInput.value)) {
      projectNameInput.style.border = "1px red solid";
      lableForProjectNameInput.after(errorMSG);
    }
  };

  projectNameInput.onfocus = function () {
    projectNameInput.style.border = "";

    errorMSG.remove();
  };
  addNewProjectForm.addEventListener("submit", (e) => {
    if (!projectNameInput.value) {
      errorMSG.innerHTML = "*Please Enter a Project Name";
      lableForProjectNameInput.after(errorMSG);

      e.preventDefault();
      return;
    }
    if (!isValidString(projectNameInput.value)) {
      let timerId = setInterval(() => {
        errorMSG.style.fontWeight = "600";
      }, 0);

      // after 5 seconds stop
      setTimeout(() => {
        clearInterval(timerId);
        errorMSG.style.fontWeight = "400";
      }, 1000);

      e.preventDefault();

      return;
    }

    e.preventDefault();

    checkedBoards.forEach((boardId) => {
      boards.push(defaultBoards[boardId]);
    });

    addProjectInLocalStorage(projectNameInput.value, boards);

    const projects = getLocalStorage("projects") || [];
    let projectId = projects[projects.length - 1].ProjectId;
    previewProjectsNameOnTheSidebar();
    renderCurrentProject(projectId);

    let projectNameElement = document.getElementById(projectId);
    projectNameElement.classList = "selected-project";

    popUpContainer.style.display = "none";
    projectNameInput.value = "";
    checkedBoards.forEach((boardID) => {
      let checkBox = document.getElementById(boardID);
      checkBox.removeAttribute("checked");
    });
    projectsList.style.display = "";
    arrow.className = "arrow-up";
    displayCheckedBoards = [];
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
