import { getLocalStorage, setLocalStorage } from "../helpers/localStorage.js";
import { makeId } from "../helpers/utils.js";
import { IdesValidationChecker } from "./board.js";

// add new task details to our local storage
export const taskValidation = ({ taskName, boardId, projectId }) => {
  if (!taskName) {
    throw new Error(" 'TaskName' is required it cant be null");
  } else if (typeof taskName != "string") {
    throw new Error("'TaskName' must be a string value");
  } else if (!boardId) {
    throw new Error(" 'boardId' is required it cant be null");
  } else if (typeof boardId != "string") {
    throw new Error(" 'boardId' must be a string value");
  } else if (!projectId) {
    throw new Error(" 'projectId' is required it cant be null");
  } else if (typeof projectId != "string") {
    throw new Error(" 'projectId' must be a string value");
  }
};

export const addTask = (taskName, taskDescription, projectId, boardId) => {
  taskValidation({ taskName, projectId, boardId });
  const projects = getLocalStorage("projects");
  const currentProject = projects.find(
    (project) => project.ProjectId == projectId
  );
  const currentBoard = currentProject.boards.find(
    (board) => board.boardId == boardId
  );
  const newTask = {
    taskId: makeId(),
    taskName,
    creationDate: "date",
    taskDescription,
  };

  currentBoard.tasks.push(newTask);
  setLocalStorage("projects", projects);
  return newTask;
};

export const deleteTask = (selectedBoardId, selectedTaskId) => {
  const projects = getLocalStorage("projects");
  const project = projects.find(
    (project) =>
      project.ProjectId == getLocalStorage("currentProjectIdFromSidebar")
  );

  IdesValidationChecker("0", selectedBoardId, selectedTaskId);
  const selectedBoard = project.boards.find(
    (board) => board.boardId == selectedBoardId
  );

  const selectedTaskDataObj = selectedBoard.tasks.find(
    (task) => task.taskId == selectedTaskId
  );

  let index = selectedBoard.tasks.indexOf(selectedTaskDataObj);

  selectedBoard.tasks.splice(index, 1);

  setLocalStorage("projects", projects);
  return projects;
};

export const updateTask = (
  editedTaskName,
  editedTaskDescription,
  selectedBoardId,
  selectedTaskId
) => {
  const projectId = getLocalStorage("currentProjectIdFromSidebar");
  taskValidation({
    taskName: editedTaskName,
    projectId,
    boardId: selectedBoardId,
  });

  const projects = getLocalStorage("projects");
  const project = projects.find((project) => project.ProjectId == projectId);

  IdesValidationChecker("0", selectedBoardId, selectedTaskId);
  const selectedBoard = project.boards.find(
    (board) => board.boardId == selectedBoardId
  );

  const selectedTaskDataObj = selectedBoard.tasks.find(
    (task) => task.taskId == selectedTaskId
  );

  selectedTaskDataObj.taskName = editedTaskName;
  selectedTaskDataObj.taskDescription = editedTaskDescription;
  setLocalStorage("projects", projects);
};
