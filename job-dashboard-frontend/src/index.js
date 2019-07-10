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

    // if (nameEditButton){
    //     nameEditButton.addEventListener('click', (event)=>{
    //         debugger;
    //         console.log(event.target)
    //         // editNameInput(event);
    //     })

    //     nameSaveButton.addEventListener('click', (event)=>{
    //         updateNameInput(event);
    //     })
    // }
})