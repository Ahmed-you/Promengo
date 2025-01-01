import {
  getLocalStorage,
  setLocalStorage,
} from "../../helpers/localStorage.js";

import { previewBoardsOnTheMainPage } from "../BoardsContainer/index.js";
import { displayCurrentProjectName } from "../Main/index.js";

const setupNavigationMenuBehaver = () => {
  const projectsNavElement = getElement("#projects-nav");
  const projectsList = getElement(".projects-list");
  const arrow = getElement("#projects-nav img");
  let li = document.createElement("li");
  window.addEventListener("load", () => {
    if (!projectsList.firstElementChild) {
      arrow.className = "arrow-down";
    } else {
      projectsList.style.display = localStorage.getItem(
        "projectsDisplayStatsInTheSideBar"
      );
      arrow.className = localStorage.getItem("sidebarArrowStats");
      // getProjectByIdAndDisplayIt("");
      let projectId = getLocalStorage("currentProjectIdFromSidebar");
      let selectedProject = document.getElementById(projectId);
      selectedProject.classList = "selected-project";
    }
  });

  projectsNavElement.addEventListener("click", (e) => {
    const { display: projectsNavDisplay } = projectsList.style;
    const isOpen = !projectsNavDisplay;

    // Open & close the menu  displayCurrentProjectName();

    projectsList.style.display = isOpen ? "none" : "";
    // Arrow type (closed or opened)
    arrow.className = isOpen ? "arrow-down" : "arrow-up";

    localStorage.setItem(
      "projectsDisplayStatsInTheSideBar",
      projectsList.style.display
    );
    localStorage.setItem("sidebarArrowStats", arrow.className);
  });
};

export const previewProjectsNameOnTheSidebar = () => {
  let projectsNameUl = getElement(".projects-list");

  const projects = getLocalStorage("projects");

  if (projects) {
    projectsNameUl.innerHTML = "";

    projects.forEach((project) => {
      let li = document.createElement("li");
      li.append(project.projectName);
      projectsNameUl.append(li);
      li.id = project.ProjectId;
    });
  }
  projectsNameUl.addEventListener("click", (e) => {
    if (e.target.className == "projects-list") return;

    let selected = projectsNameUl.querySelectorAll(".selected-project");
    for (const elem of selected) {
      elem.classList.remove("selected-project");
    }
    e.target.classList = "selected-project";

    renderCurrentProject(e.target.id);
    previewBoardsOnTheMainPage();
  });
};

export const renderCurrentProject = (id) => {
  setLocalStorage("currentProjectIdFromSidebar", id);
  displayCurrentProjectName();
};

const init = () => {
  previewProjectsNameOnTheSidebar();

  setupNavigationMenuBehaver();
};
init();
