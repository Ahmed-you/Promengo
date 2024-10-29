import { getLocalStorage, setLocalStorage } from "../helpers/localStorage.js";
import { makeId } from "../helpers/utils.js";

export const addProjectInLocalStorage = (projectName, boards) => {
  if (!projectName) {
    throw new Error(" 'projectName' is required it cant be null");
  }
  // if (projectName != "string") {
  //   console.log(typeof projectName);

  //   throw new Error("'projectName' must be a string value");
  // }

  const projects = getLocalStorage("projects") || [];

  const modifiedBoards = boards.map((boardName) => ({
    boardId: makeId(),
    boardName,
    tasks: [],
  }));

  projects.push({ ProjectId: makeId(), projectName, boards: modifiedBoards });

  setLocalStorage("projects", projects);
};

export const getProjects = () => getLocalStorage("projects");

//this function delete the selected project by its Id
export const deleteProject = (id) => {
  let projects = getLocalStorage("projects");
  let project = projects.find((item) => item.ProjectId == id);

  if (!id) {
    throw new Error("'id' is required.");
  }
  if (typeof id !== "string") {
    throw new Error("'id' must be a string.");
  }
  if (!project) {
    throw new Error("There is no project with that id");
  }
  let index = projects.indexOf(project);

  projects.splice(index, 1);

  setLocalStorage("projects", projects);
  return projects;
};

// this function update the projectName that is selected by its id
export const updateProjects = (id, newName) => {
  if (newName == "" || newName == null) {
    throw new Error("Project name cant be an empty string or a null value.");
  }

  if (!id) {
    throw new Error("there is no id");
  }
  if (typeof id !== "string") {
    throw new Error("id must be a string.");
  }

  let projects = getLocalStorage("projects");

  const project = projects.find((item) => item.ProjectId == id);

  if (!project) {
    throw new Error("there is no project with that id");
  }

  console.log(project);

  project.projectName = newName;
  let index = projects.indexOf(project);
  projects.splice(index, 1, project);
  setLocalStorage("projects", projects);
};

// this function give search for projects by there name

// export const getProject = (projectName) => {
//   if (!projectName && typeof projectName != "string") {
//     throw new Error("Pleas enter a valid name");
//   }

//   let projects = getLocalStorage("projects");

//   const wantedProjects = projects.filter((project) =>
//     project.projectName.includes(projectName)
//   );

//   if (wantedProjects.length === 0) {
//     throw new Error("no projects with that name");
//   }
//   return wantedProjects;
// };
export const getProjectById = (projectId) => {
  let projects = getLocalStorage("projects");

  if (!projectId) return;

  const wantedProject = projects.find(
    (project) => project.ProjectId == projectId
  );

  return wantedProject;
};
