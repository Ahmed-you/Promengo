import { addFirstTaskButton } from "./tasksTemplate.js";

export const boardAction = `      
<div  class="board-action">
  <div class="board-name"><p>{{boardName}}</p></div>
  <div class="actions">
    <svg class ="Icon_material-add hide"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    > desire
      <g id="add" transform="translate(-0.373 -0.349)">
        <circle
          id="Ellipse_5"
          data-name="Ellipse 5"
          cx="8"
          cy="8"
          r="8"
          transform="translate(0.373 0.349)"
          fill="#0c2196"
        />
        <path
          id="Icon_material-add"
          data-name="Icon material-add"
          d="M14.458,11.476H11.476v2.982h-.994V11.476H7.5v-.994h2.982V7.5h.994v2.982h2.982Z"
          transform="translate(-2.606 -2.63)"
          fill="#fff"
        />
      </g>
    </svg>
    <svg
    class = "Icon_material-mode-edit"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <g id="edit" transform="translate(0.139 -0.349)">
        <circle
          id="Ellipse_3"
          data-name="Ellipse 3"
          cx="8"
          cy="8"
          r="8"
          transform="translate(-0.139 0.349)"
          fill="#7acb0d"
        />
        <path
          id="Icon_material-mode-edit"
          data-name="Icon material-mode-edit"
          d="M4.5,9.75v1.382H5.844L9.808,7.056,8.464,5.673Zm6.348-3.764a.375.375,0,0,0,0-.52L10.009,4.6a.35.35,0,0,0-.505,0l-.656.675,1.344,1.382Z"
          transform="translate(0.599 0.443)"
          fill="#fff"
        />
      </g>
    </svg>

    <svg
      class = "Icon_material-delete"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <g id="delete" transform="translate(-0.349 -0.349)">
        <circle
          id="Ellipse_4"
          data-name="Ellipse 4"
          cx="8"
          cy="8"
          r="8"
          transform="translate(0.349 0.349)"
          fill="#cb400d"
        />
        <path
          id="Icon_material-delete"
          data-name="Icon material-delete"
          d="M7.876,10.518a.755.755,0,0,0,.752.752h3.009a.755.755,0,0,0,.752-.752V6H7.876Zm4.89-5.642H11.45L11.073,4.5H9.193l-.376.376H7.5v.752h5.266Z"
          transform="translate(-2.041 0.764)"
          fill="#fff"
        />
      </g>
    </svg>
  </div>
</div>`;

export const boardEdit = `
<form action="" class="board-form-container">
  <input
    type="text"
    name="board-input"
    id=""
    placeholder="Board Name"
    class="board-input"
  />
  <button class="green-submit-button-icon new-board-action-buttons-style">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="517 196.95 16 16"
    >
      <g data-name="edit">
        <!-- use curent color to tke control over the colors via css -->
        <path
          d="M517 204.9a8 8 0 1 1 0 .1z"
          fill="#7acb0d"
          fill-rule="evenodd"
          data-name="Ellipse 3"
        />
        <path
          d="m528.295 202.735-4.53 4.53-2.06-2.06"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke="#fff"
          fill="transparent"
          data-name="Icon feather-check"
        />
      </g>
    </svg>
  </button>
  <button class="red-delete-button-icon new-board-action-buttons-style">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="539 196.95 16 16"
    >
      <g data-name="delete">
        <path
          d="M539 204.9a8 8 0 1 1 0 .1z"
          fill="#cb400d"
          fill-rule="evenodd"
          data-name="Ellipse 4"
        />
        <path
          d="m549.398 203.523-.483-.523-1.915 2.074-1.915-2.074-.483.523 1.915 2.074-1.915 2.074.483.524L547 206.12l1.915 2.074.483-.524-1.915-2.074 1.915-2.074Z"
          fill="#fff"
          fill-rule="evenodd"
          data-name="Icon material-close"
        />
      </g>
    </svg>
  </button>
</form>`;
export const board = ` 
  <div class='board-header__container'>
  {{htmlBoardTemplate}}
  </div>
  <div class="tasks-container">
    ${addFirstTaskButton}
  </div>
  </div>
`;

