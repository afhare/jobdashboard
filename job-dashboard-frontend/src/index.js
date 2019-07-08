let addJob = false
const addBtn = document.querySelector('#new-job-button')
const userForm = document.querySelector('#username-form')
const jobForm = document.querySelector('#new-job-form')


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
})