function renderDashboardPage(userData){
  if (userData.nickname){
    const greeting = document.querySelector('#welcome-greeting')
    greeting.textContent = `Welcome ${userData.nickname}! `
    // const editButton = document.createElement('button')
    // editButton.className = 'edit'
    // editButton.dataset.id = userData.id
    // editButton.id = 'name-edit'
    // editButton.textContent = 'Edit'
    // greeting.appendChild(editButton)
    } else {
      const nicknameInput = document.createElement('input')
      nicknameInput.id = 'nickname-input'
      nicknameInput.type = 'text'
      const nameSaveButton = document.createElement('button')
      nameSaveButton.dataset.id = userData.id;
      nameSaveButton.className = 'edit'
      nameSaveButton.id = 'save-name-edit'
      nameSaveButton.textContent = 'Edit'
      nicknameInput.appendChild(nameSaveButton)
      document.querySelector('#welcome-greeting').appendChild(nicknameInput)
  }

  if (userData.goal){document.querySelector("#user-goal").textContent = `Today's goal: ${userData.goal}`
  }else {
    const goalInput = document.createElement('input')
    goalInput.id = 'goal-input'
    goalInput.type = 'text'
    document.querySelector('#user-goal').appendChild(goalInput)
  }

  document.querySelector('#new-job-form').dataset.id = userData.id;
  fetchJobs(userData);
}

 // function editNameInput(event){
  //   debugger;
  //   event.preventDefault();
  //   const editNicknameInput = document.createElement('input')
  //   editNicknameInput.id = 'nickname-input'
  //   editNicknameInput.type = 'text'
  //   const nameEditSaveButton = document.createElement('button')
  //   nameEditSaveButton.className = 'edit'
  //   nameEditSaveButton.id = 'save-name-edit'
  //   nameEditSaveButton.textContent = 'Edit'
  //   editNicknameInput.appendChild(nameSaveButton)
  //   document.querySelector('#welcome-greeting').appendChild(editNicknameInput)
  // }

  // function updateNameInput(event){
  //   event.preventDefault();
  //   let userIdNum = event.target.dataset.id
  //   const updateNickname = document.querySelector('#nickname-input')
  //   let nickname = updateNickname.value
  //   updateNickname.value = ''

  //   let updateObj = {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type':'application/json',
  //       'Accept':'application/json'
  //     },
  //     body: JSON.stringify({nickname: nickname})
  //   }

  //   fetch(`http://localhost:3000/users/${userIdNum}`, updateObj).then(response => response.json()).then(data =>{console.log(data)})
  // }