import { createBoard } from "../components/BoardsContainer/index.js";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage.js";
import { isValidString, makeId } from "../helpers/utils.js";
//this function will add a board to the local storage
export const addBoardInLocalStorage = (boardName, projectId) => {
  if (!boardName) {
    throw new Error(" 'boardName' is required it cant be null");
  } else if (!projectId) {
    throw new Error(" 'boardName' is required it cant be null");
  } else if (typeof boardName != "string") {
    throw new Error("'boardName' must be a string value");
  }
  const projects = getLocalStorage("projects");
  const project = projects.find((item) => item.ProjectId == projectId);

  if (!projectId) {
    throw new Error("'id' is required.");
  }
  if (typeof projectId != "string") {
    throw new Error("'id' must be a string.");
  }
  if (!project) {
    throw new Error("There is no project with that id");
  }
  const newBoard = { boardId: makeId(), boardName: boardName, tasks: [] };
  project.boards.push(newBoard);
  setLocalStorage("projects", projects);
  return newBoard;
};

export const IdesValidationChecker = (ProjectId, boardId, taskId) => {
  if (!ProjectId) {
    throw new Error("'ProjectId' is required.");
  } else if (typeof ProjectId !== "string") {
    throw new Error("'ProjectId' must be a string.");
  } else if (!boardId) {
    throw new Error("'BoardId' is required.");
  } else if (typeof boardId !== "string") {
    throw new Error("'BoardId' must be a string.");
  } else if (!taskId) {
    throw new Error("'taskId' is required.");
  } else if (typeof taskId !== "string") {
    throw new Error("'taskId' must be a string.");
  }
};
export const deleteBoard = (ProjectId, boardId) => {
  IdesValidationChecker(ProjectId, boardId, "0");

  const projects = getLocalStorage("projects");
  const project = projects.find((item) => item.ProjectId == ProjectId);
  if (!project) {
    throw new Error("There is no project with that id");
  }
  const selectedBoard = project.boards.find(
    (board) => board.boardId == boardId
  );

  let index = project.boards.indexOf(selectedBoard);

  project.boards.splice(index, 1);

  setLocalStorage("projects", projects);
  return projects;
};

export const editBoard = (editedBoardName, ProjectId, boardId) => {
  IdesValidationChecker(ProjectId, boardId, "0");

  const projects = getLocalStorage("projects");
  const project = projects.find((item) => item.ProjectId == ProjectId);
  if (!project) {
    throw new Error("There is no project with that id");
  }
  const selectedBoard = project.boards.find(
    (board) => board.boardId == boardId
  );
  selectedBoard.boardName = editedBoardName;
  setLocalStorage("projects", projects);
};

export const getBoardByID = (ProjectId, boardId) => {
  IdesValidationChecker(ProjectId, boardId, "0");

  const projects = getLocalStorage("projects");
  const project = projects.find((item) => item.ProjectId == ProjectId);
  const selectedBoard = project.boards.find(
    (board) => board.boardId == boardId
  );
  return selectedBoard;
};
