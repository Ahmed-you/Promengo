import "./Tasks/index.js";
import { getLocalStorage } from "../../../helpers/localStorage.js";
import { boardAction, boardEdit } from "../templates/boardsTemplate.js";
import {
  createTemplate,
  isValidString,
  addError,
  removeError,
} from "../../../helpers/utils.js";
import { createBoard } from "../index.js";
import {
  addBoardInLocalStorage,
  deleteBoard,
  editBoard,
  getBoardByID,
} from "../../../services/board.js";
import { bordersContainer } from "../index.js";

let OldBoardName;
let newBoardLock = false;

// handling add new board button click actions
document.addEventListener("click", (e) => {
  const { target } = e;

  if (target.closest(".add-new-board") && newBoardLock == false) {
    const NewBoard = createBoard({}, true);
    NewBoard.classList.add("smoothIn");
    bordersContainer.scrollLeft = bordersContainer.scrollWidth;
    const NewBoardInput = getElement(".board-form-container").elements[
      "board-input"
    ];
    setTimeout(() => {
      NewBoardInput.focus();
    }, 710);

    newBoardLock = true;
  }

  const selectedBoard = target.closest(".board");

  const selectedProject = getLocalStorage("currentProjectIdFromSidebar");

  // handling deleting board button click
  if (target.closest(".Icon_material-delete")) {
    selectedBoard.classList.add("smoothToVoid");

    deleteBoard(selectedProject, selectedBoard.id);
    setTimeout(() => {
      selectedBoard.remove();
    }, 500);
  }
  // handling Edit board button click
  else if (target.closest(".Icon_material-mode-edit")) {
    const selectedBoardFromLocalStorage = getBoardByID(
      selectedProject,
      selectedBoard.id
    );
    OldBoardName = selectedBoardFromLocalStorage.boardName;
    const boardHeaderContainer = target.closest(".board-header__container");
    boardHeaderContainer.innerHTML = boardEdit;
    const boardInput = boardHeaderContainer.querySelector(".board-input");
    boardInput.value = selectedBoardFromLocalStorage.boardName;
    setTimeout(() => {
      boardInput.focus();
    }, 50);
  }
  //canel adding new board when out of foucs
  if (target.closest(".new-project") || target.closest(".projects-list li")) {
    newBoardLock = false;
  }
});

// handling board details
const errorMsg = document.createElement("div");
errorMsg.classList.add("error-message");
errorMsg.style.top = "35px";
document.addEventListener("submit", (e) => {
  const boardForm = e.target.closest(".board-form-container");
  const NewBoardFormInput = boardForm
    ? boardForm.elements["board-input"]
    : null;

  if (boardForm) {
    e.preventDefault();
    const submitButton = e.submitter;

    if (submitButton.classList.contains("red-delete-button-icon")) {
      if (e.target.closest(".newBoard")) {
        getElement(".newBoard").remove();
      }
      newBoardLock = false;
    }

    if (submitButton.classList.contains("green-submit-button-icon")) {
      errorMsg.remove();
      // submit the details for the new added board
      const NewBoard = e.target.closest(".newBoard");
      if (NewBoard) {
        const vars = {
          boardName: NewBoardFormInput.value,
        };
        if (!isValidString(vars.boardName)) {
          addError(
            NewBoardFormInput,
            errorMsg,
            " *Please Enter a Valid Name Only 'a-z A-Z 0-9'"
          );
          return;
        } else if (vars.boardName.length > 80) {
          addError(
            NewBoardFormInput,
            errorMsg,
            "*Board Name Must Be less than '80' characters"
          );
          return;
        } else if (!vars.boardName) {
          addError(NewBoardFormInput, errorMsg, "*Board Name Can't Be Empty");
          return;
        }
        const { boardId, boardName } = addBoardInLocalStorage(
          vars.boardName,
          getLocalStorage("currentProjectIdFromSidebar")
        );

        getElement(".newBoard").remove();
        createBoard({ boardId, boardName });
        newBoardLock = false;
      }

      // submit the details for the edited board
      else {
        const NewBoardNameValue = boardForm.elements["board-input"].value;
        const selectedProjectId = getLocalStorage(
          "currentProjectIdFromSidebar"
        );
        const selectedBoard = e.target.closest(".board");
        const boardHeaderContainer = e.target.closest(
          ".board-header__container"
        );

        if (!isValidString(NewBoardNameValue)) {
          addError(
            NewBoardFormInput,
            errorMsg,
            " *Please Enter a Valid Name Only 'a-z A-Z 0-9'"
          );
          return;
        } else if (NewBoardNameValue.length > 80) {
          addError(
            NewBoardFormInput,
            errorMsg,
            " *Board Name Must Be less than '80' characters"
          );
          return;
        } else if (!NewBoardNameValue) {
          addError(NewBoardFormInput, errorMsg, "*Board Name Can't Be Empty");
          return;
        }
        editBoard(NewBoardNameValue, selectedProjectId, selectedBoard.id);
        boardHeaderContainer.innerHTML = createTemplate(boardAction, {
          boardName: NewBoardNameValue,
        });
      }
    }

    //cancel editing
    if (submitButton.classList.contains("red-delete-button-icon")) {
      const boardHeaderContainer = e.target.closest(".board-header__container");
      boardHeaderContainer.innerHTML = createTemplate(boardAction, {
        boardName: OldBoardName,
      });
      removeError(NewBoardFormInput, errorMsg);
      newBoardLock = false;
    }
  }
});

console.log("hi");
