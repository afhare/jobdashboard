function renderDashboardPage(userData){
  console.log(userData);
  let userId = userData.id
  fetchJobs(userId);
}

function fetchJobs(userId){
    fetch('http://localhost:3000/jobs').then(response=>response.json()).then(jobData=> {renderJobs(jobData, userId)})
}

function renderJobs(jobData, userId){
    let data = jobData.filter((job)=> job.user_id === userId)
    data.forEach(index => {renderSingleJob(index)})
}

function renderSingleJob(index){
    const ulJobList = document.querySelector('#ul-job-list');
    const jobListLi = document.createElement('li')
    jobListLi.textContent = `${index.company} - ${index.title} `
    jobListLi.dataset.id = `${index.id}`
    const expandButton = document.createElement('button')
    expandButton.className = 'expand'
    expandButton.textContent = '+'
    jobListLi.appendChild(expandButton)
    ulJobList.insertAdjacentElement('beforeend',jobListLi)
}


function handleJobFormSubmit(event){
    event.preventDefault();
    const newJob = grabFormData();
    postNewJob(newJob);
  };
  
  function grabFormData(){
    const companyNameInput = document.getElementById('new-job-company');
    const jobTitleInput = document.getElementById('new-job-title');
    const jobDescInput = document.getElementById('new-job-description')
    const jobAppStatus = document.getElementById('new-job-status');
    const jobAppDate = document.getElementById('new-job-applied-date')
    const jobPostDate = document.getElementById('new-job-posted-date')
    const jobIntvDate = document.getElementById('new-job-interview-date')
    const jobSource = document.getElementById('new-job-source')
    const jobDeadline = document.getElementById('new-job-deadline-date')
    const jobUrl = document.getElementById('new-job-url')

    const company = companyNameInput.value;
    const title = jobTitleInput.value;
    const description = jobDescInput.value;
    const applied_date = jobAppDate.value;
    const posted_date = jobPostDate.value;
    const interview_date = jobIntvDate.value;
    const source = jobSource.value;
    const deadline = jobDeadline.value;
    const url = jobUrl.value;

    const status = []
    jobAppStatus.value.forEach(state => {status.push(state)});

    companyNameInput.value = '';
    jobTitleInput.value = '';
    jobDescInput.value ='';
    jobAppDate.value = '';
    jobPostDate.value = '';
    jobIntvDate.value ='';
    jobSource.value = '';
    jobDeadline.value = '';
    jobUrl.value='';

    return {company, title, description, applied_date, posted_date, interview_date, source, deadline, url};
  };
  
  function postNewToy(newToy){
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(newToy)
    };
  
    fetch('http://localhost:3000/toys', reqObj).then(response=>response.json()).then(data=>
    renderNewToy(data))
  };