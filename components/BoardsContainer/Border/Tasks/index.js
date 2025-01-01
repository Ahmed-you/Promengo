import { getLocalStorage } from "../../../../helpers/localStorage.js";
import {
  addError,
  createTemplate,
  isValidString,
  removeError,
  taskDescriptionShorteningTool,
} from "../../../../helpers/utils.js";
import { addTask, deleteTask } from "../../../../services/task.js";
import { editTaskModel } from "../../../Models/EditTaskModel.js";
import { viewTaskModel } from "../../../Models/ViewTaskModel.js";
import {
  newTask,
  previewTask,
  addFirstTaskButton,
} from "../../templates/tasksTemplate.js";

const errorMsg = document.createElement("div");
errorMsg.classList.add("error-message");

//this function creates a new task form
const createNewTask = (boardElement) => {
  const tasksContainer = boardElement.querySelector(".tasks-container");
  if (tasksContainer) {
    tasksContainer.insertAdjacentHTML("beforeend", createTemplate(newTask));
    const newTaskForm = tasksContainer.querySelector(".new-task-form");
    const newTaskNameInput = newTaskForm["new-task-name-input"];
    const newTaskDescriptionTextarea =
      newTaskForm["new-task-description-textarea"];
    let newTaskButtonsContainer = tasksContainer.querySelector(
      ".new-task-buttons-container"
    );

    // animation+styling for the first task button
    newTaskNameInput.style.overflow = "hidden";
    newTaskDescriptionTextarea.style.overflow = "hidden";

    newTaskForm.classList.add("smooth-in-to-out-new-task");
    setTimeout(() => {
      newTaskNameInput.style.overflow = "";
      newTaskDescriptionTextarea.style.overflow = "";
      newTaskNameInput.setAttribute("placeholder", " Task Name");
      newTaskDescriptionTextarea.setAttribute(
        "placeholder",
        "Task Description"
      );
      tasksContainer.querySelector(".default")?.remove();
      newTaskNameInput.focus();
    }, 450);
    setTimeout(() => {
      newTaskNameInput.classList.add("from-0-100-width");
      newTaskDescriptionTextarea.classList.add("from-0-100-width");
      newTaskButtonsContainer.classList.remove("hide");
    }, 200);

    newTaskNameInput.oninput = () => {
      const NewTasks = document.querySelectorAll(".new-task-form");
      NewTasks.forEach((task) => {
        removeError(task["new-task-name-input"], errorMsg);
      });
    };

    // handling new task submit button
    newTaskForm.addEventListener("submit", (e) => {
      // New Task Name Validation
      const NewTasks = document.querySelectorAll(".new-task-form");
      NewTasks.forEach((task) => {
        removeError(task["new-task-name-input"], errorMsg);
      });
      e.preventDefault();
      errorMsg.style.top = "46px";

      if (!isValidString(newTaskNameInput.value)) {
        addError(
          newTaskNameInput,
          errorMsg,
          " *Enter a Valid Name Only 'a-z A-Z 0-9'"
        );
      } else if (!newTaskNameInput.value) {
        addError(newTaskNameInput, errorMsg, "* Name Can't Be Empty");
      } else if (newTaskNameInput.value.length > 25) {
        addError(
          newTaskNameInput,
          errorMsg,
          " *Name Must Be less than '25' characters"
        );
        newTaskNameInput.focus();

        newTaskNameInput.oninput = () => {
          removeError(newTaskNameInput, errorMsg);
        };
      } else {
        newTaskNameInput.oninput = () => {
          removeError(newTaskNameInput, errorMsg);
        };
        const task = addTask(
          newTaskNameInput.value,
          newTaskDescriptionTextarea?.value,
          getLocalStorage("currentProjectIdFromSidebar"),
          boardElement.id
        );
        task.taskId;

        const taskData = {
          taskName: newTaskNameInput.value,
          taskDescription: taskDescriptionShorteningTool(
            newTaskDescriptionTextarea.value
          ),
          taskId: task.taskId,
        };
        tasksContainer.insertAdjacentHTML(
          "beforeend",
          createTemplate(previewTask, taskData)
        );
        tasksContainer.querySelector(".new-task-form").remove();
        setTimeout(() => {
          tasksContainer.scrollBy(0, tasksContainer.scrollHeight);
        }, 170);
        const bluePlusAddIcon = boardElement?.querySelector(
          " .Icon_material-add"
        );
        bluePlusAddIcon?.classList?.remove("hide");
      }
    });
    // handel New Task Form Cancel button
    const NewTaskFormCancelButton = newTaskForm["new-task-cancel"];
    NewTaskFormCancelButton.addEventListener("click", (e) => {
      //First Task Only Case+Special Animation
      if (!tasksContainer.querySelectorAll(".task").length >= 1) {
        newTaskForm.remove();
        tasksContainer.insertAdjacentHTML(
          "beforeend",
          createTemplate(addFirstTaskButton)
        );
      } else {
        newTaskForm.remove();
      }
    });
  }
};

document.addEventListener("click", (e) => {
  const { target } = e;
  if (target.closest(".task-preview-close-button")) {
    target
      .closest(".task-preview-background-click-cover")
      .classList.add("hide");
  }
  if (!target.closest(".task-actions_three-dots-show_more")) {
    const actionList = document.querySelector(
      ".tasks-container .actions-container.show"
    );

    actionList?.classList.remove("show");
  }
  if (!target.closest(".board")) return;

  const boardElement = target.closest(".board");
  const addFirstTaskButtonEl = target.closest(".add-first-task-button");
  const isNewBoard = boardElement?.classList.contains("newBoard");
  let tasksContainer;

  //----add first task & BluePlusIcon buttons click handel
  if (addFirstTaskButtonEl && !isNewBoard) {
    tasksContainer = target.closest(".tasks-container");
    document.querySelector(".add-first-task-button").classList.add("delay-2s");
    // only 1 board allowed
    if (tasksContainer.querySelector(".new-task-form")) return;

    createNewTask(boardElement);
  } else if (target.closest(".Icon_material-add")) {
    tasksContainer = boardElement.querySelector(".tasks-container");
    if (tasksContainer?.querySelector(".new-task-form")) return;

    createNewTask(boardElement);
    //on every new task scroll to the bottom of the task container
    const newTaskForm = tasksContainer.querySelector(".new-task-form");
    newTaskForm.classList.add("fixed-new-task-height");
    setTimeout(() => {
      tasksContainer.scrollBy(0, tasksContainer.scrollHeight);
    }, 10);
  }
  // stop the user from adding a new Task Before adding a board name
  else if (addFirstTaskButtonEl && isNewBoard) {
    const boardInput = boardElement.querySelector(".board-input");

    addFirstTaskButtonEl.style.backgroundColor = "rgb(255 71 71)";
    errorMsg.style.top = "35px";
    boardInput.onfocus = () => {
      removeError(boardInput, errorMsg);
      addFirstTaskButtonEl.style.backgroundColor = "#dfe3fd";
    };
    addError(boardInput, errorMsg, "Add a Board Name First");
    if (boardElement.querySelectorAll(".error-message").length > 1) {
      errorMsg.remove();
    }
    setTimeout(() => {
      removeError(boardInput, errorMsg);
      addFirstTaskButtonEl.style.backgroundColor = "#dfe3fd";
    }, 2000);
  }

  //show more click
  const selectedTaskId = target?.closest(".task")?.id;
  const selectedBoardElement = target?.closest(".board");
  const selectedBoardId = selectedBoardElement?.id;

  if (target.closest(".show-more")) {
    viewTaskModel(selectedBoardId, selectedTaskId);
  }

  const threeDots = target.closest(".task-actions_three-dots-show_more");
  let actionList;

  if (threeDots) {
    const actionTaskList = document.querySelector(
      ".tasks-container .actions-container.show"
    );

    actionTaskList?.classList.remove("show");
    actionList = threeDots.querySelector(".tasks-container .actions-container");
    actionList?.classList.remove("show");
    actionList.classList.toggle("show");
    const bb = boardElement.querySelector(".tasks-container").scrollTop;
    boardElement.querySelector(".tasks-container").onscroll = function () {
      actionList.classList.remove("show");
    };
    actionList.style.top = threeDots.offsetTop - bb + 15 + "px";
    actionList.style.left = threeDots.offsetLeft + 15 + "px";

    //on edit click show edit model
    if (target.closest(".edit")) {
      editTaskModel(selectedBoardId, selectedTaskId);
      // } else if (target.closest) {
    } else if (target.closest(".delete")) {
      deleteTask(selectedBoardId, selectedTaskId);

      target.closest(".task").remove();
      if (selectedBoardElement.querySelectorAll(".task").length == 0) {
        selectedBoardElement.querySelector(".tasks-container").innerHTML =
          createTemplate(addFirstTaskButton);
        selectedBoardElement
          .querySelector(".Icon_material-add")
          .classList.add("hide");
      }
    }
  } else {
    actionList = document.querySelector(
      ".tasks-container .actions-container.show"
    );
    actionList?.classList.remove("show");
  }
});

export const previewTasksOnEachBoard = (task, boardElement) => {
  // make sure that the description on the preview main page is not too long if so add a show more button
  task.taskDescription = taskDescriptionShorteningTool(task.taskDescription);

  boardElement.querySelector(".Icon_material-add").classList.remove("hide");
  boardElement?.querySelector(".default")?.remove();
  boardElement.querySelector(".tasks-container").innerHTML += createTemplate(
    previewTask,
    task
  );
};
