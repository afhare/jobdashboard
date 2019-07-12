let displayEdit = false
let addJob = false
const addBtn = document.querySelector('#new-job-button')
const userForm = document.querySelector('#username-form')
const jobForm = document.querySelector('#new-job-form')
const jobContainer = document.querySelector('#new-job-container')
const nameEditButton = document.querySelector('#name-edit')
const nameSaveButton = document.querySelector('#save-name-edit')
const jobList = document.querySelector('#job-list')
let displayDetails = false
const taskForm = document.querySelector('#new-task-form')
const taskList = document.querySelector('#task-list')
let showTaskForm = document.querySelector('#new-task-button')
let taskContainer = document.querySelector('#new-task-container')
let showTask = false
let goalForm = document.querySelector('#edit-goal-form')
let noteForm = document.querySelector('#edit-scratchpad-form')
let displayGoalEdit = false;
let editGoalBtn = document.querySelector('#edit-goal-button')
let displayScratchpadEdit = false;
let editScratchpadBtn = document.querySelector('#edit-scratchpad-button')
let editScratchpadForm = document.querySelector('#edit-scratchpad-form')

document.addEventListener('DOMContentLoaded',()=>{
    logIn();
    
    generateQuote();

    document.querySelector('#quote').addEventListener('click', () => {
        generateQuote();
    })
    
    userForm.addEventListener('submit',(event)=>{
        handleUserLogin(event);
    })

    addBtn.addEventListener('click', () => {
        addJob = !addJob
        if (addJob) {
          jobContainer.style.display = 'block'
          jobList.style.display = 'none'
        } else {
          jobContainer.style.display = 'none'
          jobList.style.display = 'block'
        }
    })

    showTaskForm.addEventListener('click', () => {
        showTask = !showTask
        if (showTask) {
          taskContainer.style.display = 'block'
          taskList.style.display = 'none'
        } else {
          taskContainer.style.display = 'none'
          taskList.style.display = 'block'
        }
    })

    editGoalBtn.addEventListener('click', () => {
        displayGoalEdit = !displayGoalEdit
        if (displayGoalEdit) {
            goalForm.style.display = 'block'
        } else {
            goalForm.style.display = 'none'
        }
    })

    editScratchpadBtn.addEventListener('click', () => {
        displayScratchpadEdit = !displayScratchpadEdit
        if (displayScratchpadEdit) {
            editScratchpadForm.style.display = 'block'
        } else {
            editScratchpadForm.style.display = 'none'
        }
    })

    jobForm.addEventListener('submit', (event)=>{
        jobContainer.style.display = 'none'
        jobList.style.display = 'block'
        handleJobFormSubmit(event);
    })

    jobList.addEventListener('click', (event) => {
        if (event.target.id === 'expand-details'){
            displayDetails = !displayDetails
            if (displayDetails){
                event.target.nextSibling.style.display = 'block'
            } else {
                event.target.nextSibling.style.display = 'none'
            }
        } else if (event.target.id === 'delete-job'){
            handleDeleteJob(event)
        } else if (event.target.id === 'edit-details'){
            displayEdit = !displayEdit
            if (displayEdit){
                event.target.nextSibling.style.display = 'block'
            }else{
                event.target.nextSibling.style.display = 'none'
                }
        } else if(event.target.id === 'save-job-edit'){
            handleJobEditSubmit(event)
        }

        }
    )

    taskForm.addEventListener('submit', (event)=>{
        taskContainer.style.display = 'none'
        taskList.style.display = 'block'
        handleNewTaskSubmit(event);
    })

    taskList.addEventListener('click', (event)=>{
        if (event.target.id === 'delete-task'){
            handleTaskDelete(event)
        }
        else if (event.target.id === 'complete-task'){
            handleTaskComplete(event)
        }
    })
    goalForm.addEventListener('submit',(event)=>{
        handleUpdateGoal(event);
    })

    noteForm.addEventListener('submit',(event)=>{
        handleUpdateScratchpad(event);
    })
})