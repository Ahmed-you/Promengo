import { getLocalStorage } from "../../helpers/localStorage.js";
import { getProjectFromLocalStorageById } from "../../services/project.js";
let proName = document.querySelector(".project-name");
export const viewProjectNameOnMainPage = () => {
  let wantedProject = getProjectFromLocalStorageById(
    +localStorage.getItem("currentProjectIdFromSidebar")
  );

  proName.textContent = wantedProject.projectName;
};

window.onload = () => {
  let wantedProject =
    getProjectFromLocalStorageById(
      +getLocalStorage("currentProjectIdFromSidebar")
    ) || "No Project";

  proName.textContent =
    wantedProject == "No Project" ? "NoProjectsYet" : wantedProject.projectName;
};
const init = () => {};
init();
