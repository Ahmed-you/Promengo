import { getLocalStorage } from "../../helpers/localStorage.js";
import { getProjectById } from "../../services/project.js";

export const viewTaskModel = (selectedBoardId, selectedTaskId) => {
  const taskViewModel = getElement(".task-preview-background-click-cover");
  const taskPreviewNameElement =
    taskViewModel.querySelector(".task-preview-name");
  const taskPreviewDescriptionElement = taskViewModel.querySelector(
    ".task-preview-description"
  );
  const selectedTaskDataObj = getProjectById(
    getLocalStorage("currentProjectIdFromSidebar")
  )
    .boards.find((board) => board.boardId == selectedBoardId)
    .tasks.find((task) => task.taskId == selectedTaskId);

  taskViewModel.classList.remove("hide");
  taskPreviewNameElement.textContent = selectedTaskDataObj.taskName;
  taskPreviewDescriptionElement.textContent =
    selectedTaskDataObj.taskDescription;
};
