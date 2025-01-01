export const addFirstTaskButton = `
  <div class='default' >

<div class="add-first-task-button">

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <!-- Background Circle -->
    
      <!-- Notepad Base -->
      <rect x="30" y="25" width="40" height="50" rx="5" ry="5" fill="#ffffff" stroke="#0c2196" stroke-width="2" />
    
      <!-- Plus Sign -->
      <line x1="50" y1="32" x2="50" y2="42" stroke="#0c2196" stroke-width="2" />
      <line x1="45" y1="37" x2="55" y2="37" stroke="#0c2196" stroke-width="2" />
    
      <!-- Task Checklist -->
      <circle cx="35" cy="50" r="2" fill="#0c2196" />
      <line x1="40" y1="50" x2="65" y2="50" stroke="#0c2196" stroke-width="2" />
      <circle cx="35" cy="58" r="2" fill="#0c2196" />
      <line x1="40" y1="58" x2="65" y2="58" stroke="#0c2196" stroke-width="2" />
      <circle cx="35" cy="66" r="2" fill="#0c2196" />
      <line x1="40" y1="66" x2="65" y2="66" stroke="#0c2196" stroke-width="2" />
    
    
  </svg>Add
  
</div>

<h2 class="add-first-task-text"> Add first task </h2>
</div>
`;

export const newTask = ` <form action="" class="new-task-form">
  <input type="text" name=""  id="new-task-name-input" />
  <textarea
    name=""
   
    id="new-task-description-textarea"
  ></textarea>

  <div class="new-task-buttons-container hide">
    <input type="submit" value="Save" name="" id="new-task-submit" />
    <input type="button" value="Cancel" name="" id="new-task-cancel" />
  </div>
</form>

`;

export const previewTask = `<div class="task" id =  '{{taskId}}'>
  <div class="task-header">
    <div class="task-name">{{taskName}}</div>

    <div class="task-actions_three-dots-show_more">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="12.406"
        viewBox="0 0 17.624 4.406"
      >
        <path
          id="Icon_material-more-horiz"
          data-name="Icon material-more-horiz"
          d="M8.2,15a2.2,2.2,0,1,0,2.2,2.2A2.209,2.209,0,0,0,8.2,15Zm13.218,0a2.2,2.2,0,1,0,2.2,2.2A2.209,2.209,0,0,0,21.421,15Zm-6.609,0a2.2,2.2,0,1,0,2.2,2.2A2.209,2.209,0,0,0,14.812,15Z"
          transform="translate(-6 -15)"
          fill="#a09999"
        />
      </svg>

      <div class="actions-container">
        <div class="edit action-item">
          <p>Edit</p>
        </div>

        <div class="delete action-item">
          <p>Delete</p>
        </div>
      </div>
    </div>
  </div>
  <div class="task-body">
    <div class="task-creation-date">24 July 2024, 10:00 AM</div>
    <div class="task-description">{{taskDescription}}</div>
  </div>
</div>
`;
