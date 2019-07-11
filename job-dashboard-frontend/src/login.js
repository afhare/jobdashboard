const dashboard = document.querySelector('#dashboard')
let loggedIn = true
const logInSection = document.querySelector('#login')

function handleUserLogin(event){
  event.preventDefault();
  let currentUser = grabUserFormData();
  logInUser(currentUser)
};

function grabUserFormData(){
  const user = document.querySelector('#username')
  const username = user.value
  user.value ='';
  const nameInput = document.querySelector('#nickname')
  const nickname = nameInput.value
  nameInput.value ='';
  return {username, nickname}
}

function logInUser(currentUser) {
  let loginObj = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(currentUser)
  }

  fetch('http://localhost:3000/users/login', loginObj).then(response => response.json()).then(data => {
      logIn();
      renderDashboardPage(data)})
}


function logIn() {
  loggedIn = !loggedIn
  if (loggedIn) {
    dashboard.style.display = 'block'
    document.querySelector('#new-job-container').style.display = 'none'
    document.querySelector('#new-task-container').style.display = 'none'
    logInSection.style.display = 'none'
  } else {
    dashboard.style.display = 'none'
    logInSection.style.display = 'flex'
  }
}