let addJob = true
const addBtn = document.querySelector('#new-job-button')
const userForm = document.querySelector('#username-form')
const jobForm = document.querySelector('#new-job-form')
const nameEditButton = document.querySelector('#name-edit')
const nameSaveButton = document.querySelector('#save-name-edit')
const jobList = document.querySelector('#job-list')
let displayDetails = false

document.addEventListener('DOMContentLoaded',()=>{
    logIn();
    
    userForm.addEventListener('submit',(event)=>{
        handleUserLogin(event);
    })

    addBtn.addEventListener('click', () => {
        addJob = !addJob
        if (addJob) {
          jobForm.style.display = 'block'
        } else {
          jobForm.style.display = 'none'
        }
    })

    jobForm.addEventListener('submit', (event)=>{
        handleJobFormSubmit(event);
    })

    jobList.addEventListener('click', (event) => {
        displayDetails = !displayDetails
        if (displayDetails){
            event.target.nextSibling.style.display = 'block'
        } else {
            event.target.nextSibling.style.display = 'none'
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