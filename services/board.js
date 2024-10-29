import { getLocalStorage, setLocalStorage } from "../helpers/localStorage.js";
import { makeId } from "../helpers/utils.js";
import { getProjectById } from "./project.js";

export const addBoardInLocalStorage = (boardName, projectId) => {
  if (!boardName) {
    throw new Error(" 'boardName' is required it cant be null");
  }
  if (!projectId) {
    throw new Error(" 'boardName' is required it cant be null");
  }
  // if (boardName != "string") {
  //   console.log(typeof projectName);

  //   throw new Error("'projectName' must be a string value");
  // }
  let projects = getLocalStorage("projects");
  let project = projects.find((item) => item.ProjectId == projectId);

  if (!projectId) {
    throw new Error("'id' is required.");
  }
  if (typeof id === "string") {
    throw new Error("'id' must be a number.");
  }
  if (!project) {
    throw new Error("There is no project with that id");
  }

  project.boards.push({ boardID: makeId(), boardName: boardName });
};
