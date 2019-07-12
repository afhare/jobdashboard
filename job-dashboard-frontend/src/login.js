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
    document.querySelector('#edit-goal-form').style.display = 'none'
    document.querySelector('#edit-scratchpad-form').style.display = 'none'
    logInSection.style.display = 'none'
  } else {
    dashboard.style.display = 'none'
    logInSection.style.display = 'flex'
  }
}


function getRandomQuoteIndex(array) {
  min = Math.ceil(0);
  max = Math.floor(array.length);
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateQuote() {
  const quotes = [`“It is never too late to be what you might have been.” – George Eliot`,
  `“If opportunity doesn’t knock, then build a door.” – Milton Berle`,
  `“A person who never made a mistake never tried anything new.” – Albert Einstein`,
  '“One important key to success is self-confidence. An important key to self-confidence is preparation.” –Arthur Ashe', 
  '“The future belongs to those who believe in the beauty of their dreams.” –Eleanor Roosevelt',
  '“Find out what you like doing best and get someone to pay you for doing it.” –Katherine Whitehorn',
  `“Opportunities don't often come along. So, when they do, you have to grab them.” –Audrey Hepburn`,
  `"If you don't like something, change it. If you can't change it, change your attitude.” –Maya Angelou`,
  `“Success doesn't come to you, you go to it.” –Marva Collins`]
  let index = getRandomQuoteIndex(quotes);
  document.querySelector('#quote').textContent = `${quotes[index]}`
}