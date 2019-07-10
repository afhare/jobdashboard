function fetchTasks(userData){
    fetch('http://localhost:3000/tasks').then(response=>response.json()).then(taskData=> {renderTasks(taskData, userData)})
}

function renderTasks(taskData, userData){
    let data = taskData.filter((task)=> task.user_id === userData.id)
    data.forEach(index => {renderSingleTask(index)})
}

function renderSingleTask(index){
    const ulTaskList = document.querySelector('#ul-task-list')

    const taskLi = document.createElement('li')
    taskLi.textContent = `${index.job.company} - ${index.job.title} :: Task: ${index.activity}`
    
    const dueDate = document.createElement('p')
    dueDate.textContent = `Due by: ${index.due_by}`
    dueDate.id = 'task-due-date'

    const deleteTaskButton = document.createElement('button')
    deleteTaskButton.className = 'delete'
    deleteTaskButton.id = 'delete-task'
    deleteTaskButton.textContent = `${String.fromCodePoint('0x1F5D1')}: Delete`
    deleteTaskButton.dataset.id = index.id

    const completeTaskButton = document.createElement('button')
    completeTaskButton.className = 'complete'
    completeTaskButton.id = 'complete-task'
    completeTaskButton.textContent = `${String.fromCodePoint('0x2714')}: Done`
    completeTaskButton.dataset.id = index.id

    taskLi.append(deleteTaskButton, completeTaskButton, dueDate)
    ulTaskList.insertAdjacentElement('beforeend',taskLi)
}

function handleNewTaskSubmit(event){
    event.preventDefault();
    const newTask = grabTaskData();
    postNewTask(newTask);
}

function grabTaskData(){
    const activityInput = document.querySelector('#new-task-activity')
    const jobInput = document.querySelector('#new-task-job')
    const user_id = document.querySelector('#taskUserId').dataset.id
    const dueInput = document.querySelector('#new-task-due-date')

    const activity = activityInput.value 
    const job_id = jobInput.value 
    const due_by = dueInput.value

    activityInput.value = '';
    jobInput.value = '';
    dueInput.value = '';

    return {user_id, activity, job_id, due_by}
}

function postNewTask(newTask){
    const taskReqObj = {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify(newTask)
      };
    
      fetch('http://localhost:3000/tasks', taskReqObj).then(response=>response.json()).then(data=>
      renderSingleTask(data))
}

function handleTaskDelete(event){
    let delTaskObj = {method: 'DELETE'}

    fetch(`http://localhost:3000/tasks/${event.target.dataset.id}`, delTaskObj).then(removeTask(event))
}

function removeTask(event){
    event.target.parentElement.remove();
}

function handleTaskComplete(event){
    event.target.parentElement.querySelector('#task-due-date').textContent = "Completed"
    event.target.remove();
}
