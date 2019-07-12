function renderDashboardPage(userData){
    const greeting = document.querySelector('#welcome-greeting')
    greeting.textContent = `${userData.nickname}! `
  if (userData.goal){
    document.querySelector("#user-goal").textContent = userData.goal
  }else {
    document.querySelector("#user-goal").textContent = 'What is the goal of your search today?'
  }

  const editGoalBtn = document.querySelector('#edit-goal')
  editGoalBtn.value = `${String.fromCodePoint('0x270F')} : Submit New goal`
  editGoalBtn.dataset.id = userData.id
  

  document.querySelector('#new-job-form').dataset.id = userData.id;
  document.querySelector('#new-job-form').querySelector('#user_id').dataset.id = userData.id;
  document.querySelector('#new-task-form').querySelector('#taskUserId').dataset.id = userData.id;
  document.querySelector('#edit-goal-form').dataset.id = userData.id
  document.querySelector('#edit-scratchpad-form').dataset.id = userData.id

  const scratchpad = document.querySelector('#scratchpad-list')
  const scratchpadP = document.createElement('p')
  scratchpadP.id = 'scratchpad-item'
  scratchpad.dataset.id = userData.id;
  if (userData.scratchpad){
    scratchpadP.textContent = userData.scratchpad
    scratchpad.append(scratchpadP)
  }
  const editScratchpadBtn = document.querySelector('#edit-scratchpad')
  editScratchpadBtn.dataset.id = userData.id
  editScratchpadBtn.value = `${String.fromCodePoint('0x270F')} : Submit New Note`
  

  fetchJobs(userData);
  fetchTasks(userData);
}

function handleUpdateGoal(event){
  event.preventDefault();
  const newGoal = goalFormData();
  postNewGoal(newGoal, event)
}

function goalFormData(){
  const goalInput = document.querySelector('#edit-goal-input')
  const goal = goalInput.value
  goalInput.value = ''
  return {goal}
}

function postNewGoal(newGoal, event){
  let goalObj = {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(newGoal)
  }
  fetch(`http://localhost:3000/users/${event.target.dataset.id}`, goalObj).then(response=>response.json()).then(userData=> {renderUpdateGoal(userData)})
}

function renderUpdateGoal(userData) {
  document.querySelector("#user-goal").textContent = `Today's goal: ${userData.goal}` 
}


function handleUpdateScratchpad(event) {
  event.preventDefault();
  const newScratchpad = scratchpadData();
  postNewScratchpad(newScratchpad, event)
}

function scratchpadData(){
  const scratchpadInput = document.querySelector('#edit-scratchpad-input')
  const scratchpad = scratchpadInput.value
  scratchpadInput.value = ''
  return {scratchpad}
}

function postNewScratchpad(newScratchpad, event){
  let scratchObj = {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(newScratchpad)
  }

  fetch(`http://localhost:3000/users/${event.target.dataset.id}`, scratchObj).then(response=>response.json()).then(userData=> {renderUpdateScratchpad(userData)})
}

function renderUpdateScratchpad(userData){
  if (document.querySelector('#scratchpad-item')) {
    const scratchpadPEl = document.querySelector('#scratchpad-item')
    scratchpadPEl.textContent = userData.scratchpad
  } else {
    let scratchpadPElem = document.createElement('p')
    scratchpadPElem.id = 'scratchpad-item'
    scratchpadPElem.textContent = userData.scratchpad
    document.querySelector('#scratchpad-list').append(scratchpadPElem)
  }
}