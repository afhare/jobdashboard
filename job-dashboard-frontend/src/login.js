const dashboard = document.querySelector('#dashboard')
let loggedIn = true
const usernameForm = document.querySelector('#username-form')

function handleUserLogin(event){
  event.preventDefault();
  let currentUser = grabUserFormData();
  logInUser(currentUser)
};

function grabUserFormData(){
  const user = document.querySelector('#username')
  const username = user.value
  user.value ='';
  return {username}
}

function logInUser(currentUser){
  let loginObj = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(currentUser)
  }

  fetch('http://localhost:3000/users/login', loginObj).then(response=> response.json()).then(data=>{
      logIn();
      renderDashboardPage(data)})
}


function logIn(){
  loggedIn = !loggedIn
        if (loggedIn){
            dashboard.style.display = 'block'
            document.querySelector('#new-job-container').style.display = 'none'
            usernameForm.style.display = 'none'
        } else{
            dashboard.style.display = 'none'
            usernameForm.style.display = 'block'
        }
}