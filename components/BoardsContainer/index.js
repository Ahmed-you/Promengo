import { getLocalStorage } from "../../helpers/localStorage.js";
import { getProjectById } from "../../services/project.js";
import "./Border/index.js";
import { board, boardAction, boardEdit } from "./templates/boardsTemplate.js";
import { createTemplate } from "../../helpers/utils.js";

//variables & constants;
export const bordersContainer = getElement(".boards-container");

//executing this function will create a board in the main page
export const createBoard = (vars, isNewBoard = false) => {
  const newBoard = document.createElement("div");
  newBoard.classList.add("board");

  //there is no name ? then create newBoard
  if (isNewBoard) {
    newBoard.insertAdjacentHTML(
      "beforeend",
      createTemplate(board, { htmlTemplate: boardEdit })
    );

    newBoard.classList.add("newBoard");

    bordersContainer.append(newBoard);
    return newBoard;
  }
  //there is a name ? then enable preview mode
  else {
    newBoard.insertAdjacentHTML(
      "beforeend",
      createTemplate(board, { htmlTemplate: boardAction, ...vars })
    );

    newBoard.id = vars.boardId;

    bordersContainer.append(newBoard);
  }
};

//this function will get all boards in a selected project from local storage and preview them on the main page
export const previewBoardsOnTheMainPage = () => {

  bordersContainer.innerHTML = "";
  const projectId = getLocalStorage("currentProjectIdFromSidebar");
  const selectedProject = getProjectById(projectId);
  const projectNameElement = getElement(".project-name");
  const threeDotsIcon = getElement(".three-dots-icon");
  const addNewBoard = getElement(".add-new-board");

  if (!selectedProject) {
    projectNameElement.textContent = "NoProjectsYet";
    threeDotsIcon.classList.add("hide");
    addNewBoard.classList.add("hide");
  } else {
    projectNameElement.textContent = selectedProject.projectName;
    threeDotsIcon.classList.remove("hide");
    addNewBoard.classList.remove("hide");

    const boards = selectedProject.boards;

    boards.forEach((board) => {
      createBoard(board);
    });
  }
};

const init = () => {
  previewBoardsOnTheMainPage();
};
init();
