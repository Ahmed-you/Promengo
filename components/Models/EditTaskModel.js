import { getLocalStorage } from "../../helpers/localStorage.js";
import { addError, isValidString, removeError, taskDescriptionShorteningTool } from "../../helpers/utils.js";
import { getProjectById } from "../../services/project.js";
import { updateTask } from "../../services/task.js";

const editTaskForm = getElement(".task-edit-data-container");
const editTaskModelEl = getElement(".task-edit-background-click-cover");

export const editTaskModel = (selectedBoardId, selectedTaskId) => {
  //show the Edit task model
  editTaskModelEl.classList.remove("hide");

  //get the selected task from the localstorage
  //hen place the old name & description values in to the Edit Task Form inputs
  const selectedTaskDataObj = getProjectById(
    getLocalStorage("currentProjectIdFromSidebar")
  )
    .boards.find((board) => board.boardId == selectedBoardId)
    .tasks.find((task) => task.taskId == selectedTaskId);

  editTaskForm.dataset.taskId = selectedTaskId;
  editTaskForm.dataset.boardId = selectedBoardId;
  let currentTaskNameElement = editTaskForm["edit-task-name-input"];
  let currentTaskDescriptionElement =
    editTaskForm["edit-task-description-textarea"];

  currentTaskNameElement.value = selectedTaskDataObj.taskName;
  currentTaskDescriptionElement.value = selectedTaskDataObj.taskDescription;
  currentTaskNameElement.focus();
};

const errorMsg = document.createElement("div");
errorMsg.classList.add("error-message");
errorMsg.style.top = "14px";

editTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { taskId: currentTaskId, boardId: currentBoardId } = e.target.dataset;
  const { taskName: taskNameEl, taskDescription: taskDescriptionEl } = e.target;
  removeError(taskNameEl, errorMsg);
  const submitButton = e.submitter;
  if (submitButton.name == "cancel") {
    editTaskModelEl.classList.add("hide");
    return;
  }

  if (!isValidString(taskNameEl.value)) {
    addError(taskNameEl, errorMsg, " *Enter a Valid Name Only 'a-z A-Z 0-9'");
    taskNameEl.focus();
  } else if (!taskNameEl.value) {
    addError(taskNameEl, errorMsg, "* Name Can't Be Empty");
    taskNameEl.focus();
  } else if (taskNameEl.value.length > 25) {
    addError(taskNameEl, errorMsg, " *Name Must Be less than '25' characters");
    taskNameEl.focus();

    taskNameEl.oninput = () => {
      removeError(taskNameEl, errorMsg);
    };
  } else {
    taskNameEl.oninput = () => {
      removeError(taskNameEl, errorMsg);
    };

    editTaskModelEl.classList.add("hide");

    updateTask(
      taskNameEl.value,
      taskDescriptionEl.value,
      currentBoardId,
      currentTaskId
    );
    removeError(taskNameEl, errorMsg);

    const taskEl = document.getElementById(`${currentTaskId}`);
    taskEl.querySelector(".task-name").textContent = taskNameEl.value;
    taskEl.querySelector(".task-description").innerHTML =
      taskDescriptionShorteningTool(taskDescriptionEl.value);
  }
});
