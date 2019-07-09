function fetchJobs(userData){
    fetch('http://localhost:3000/jobs').then(response=>response.json()).then(jobData=> {renderJobs(jobData, userData)})
}

function renderJobs(jobData, userData){
    let data = jobData.filter((job)=> job.user_id === userData.id)
    data.forEach(index => {renderSingleJob(index)})
}

function renderSingleJob(index){
    const ulJobList = document.querySelector('#ul-job-list');
    
    const jobListLi = document.createElement('li')
    jobListLi.textContent = `${index.company} - ${index.title} `
    jobListLi.dataset.id = index.id

    const jobDetails = document.createElement('section')
    jobDetails.id = 'job-details'
    jobDetails.dataset.id = index.id
    
    const expandButton = document.createElement('button')
    expandButton.className = 'expand'
    expandButton.id = 'expand-details'
    expandButton.textContent = '+'
    expandButton.dataset.id = index.id
    
    const jobDescP = document.createElement('p');
    jobDescP.textContent = index.description;
    
    const jobStatus = document.createElement('h5')
    jobStatus.textContent = index.status;
    
    const dreamJob = document.createElement('p');
    if (index.dream_job === true){
      dreamJob.textContent = `Dream Job Status: ${String.fromCodePoint('0x1F31F')}`
    }
    jobDetails.append(jobDescP, jobStatus, dreamJob)
    jobListLi.append(expandButton, jobDetails)
    jobDetails.style.display = 'none'
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
    const dreamJobStatus = document.getElementById('dream-job')

    const company = companyNameInput.value;
    const title = jobTitleInput.value;
    const description = jobDescInput.value;
    if (jobAppDate.value){
      const applied_date = jobAppDate.value;
    }else{
      applied_date = null
    }
    if (jobPostDate.value){
      const posted_date = jobPostDate.value;
    }else{
      posted_date = null
    }
    if (jobIntvDate.value){
      const interview_date = jobIntvDate.value;
    }else{
      interview_date = null
    }
    const source = jobSource.value;
    const deadline = jobDeadline.value;
    const url = jobUrl.value;
    const user_id = document.querySelector('#new-job-form').dataset.id

    let dream_job = false;
    if(dreamJobStatus.value === "on"){
      dream_job = true;
    }

    const status = jobAppStatus.value;

    companyNameInput.value = '';
    jobTitleInput.value = '';
    jobDescInput.value ='';
    jobAppDate.value = '';
    jobPostDate.value = '';
    jobIntvDate.value ='';
    jobSource.value = '';
    jobDeadline.value = '';
    jobUrl.value='';

    return {company, title, description, applied_date, posted_date, interview_date, source, deadline, url, user_id, dream_job};
  };
  
  function postNewJob(newJob){
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(newJob)
    };
  
    fetch('http://localhost:3000/jobs', reqObj).then(response=>response.json()).then(data=>
    renderSingleJob(data))
  };