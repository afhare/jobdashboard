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
const taskList = document.querySelector('#ul-task-list')
let showTaskForm = document.querySelector('#new-task-button')
let taskContainer = document.querySelector('#new-task-container')
let showTask = false
let goalForm = document.querySelector('#edit-goal-form')
let noteForm = document.querySelector('#edit-scratchpad-form')

document.addEventListener('DOMContentLoaded',()=>{
    logIn();
    
    userForm.addEventListener('submit',(event)=>{
        handleUserLogin(event);
    })

    addBtn.addEventListener('click', () => {
        addJob = !addJob
        if (addJob) {
          jobContainer.style.display = 'block'
        } else {
          jobContainer.style.display = 'none'
        }
    })

    showTaskForm.addEventListener('click', () => {
        showTask = !showTask
        if (showTask) {
          taskContainer.style.display = 'block'
        } else {
          taskContainer.style.display = 'none'
        }
    })

    jobForm.addEventListener('submit', (event)=>{
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