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
    jobListLi.dataset.jobId = index.id
    jobListLi.className = 'job-listing'

    const jobDetails = document.createElement('section')
    jobDetails.id = 'job-details'
    jobDetails.dataset.id = index.id

// edit form begins
    const editJobButton = document.createElement('button')
    editJobButton.className = 'edit'
    editJobButton.id = 'edit-details'
    editJobButton.dataset.id = index.id
    editJobButton.textContent = `${String.fromCodePoint('0x270F')} : Edit`
    
    const editContainer = document.createElement('section')
    editContainer.dataset.id = index.id
    editContainer.className = 'edit'
    editContainer.id = 'edit-container'

    const editForm = document.createElement('form')
    editForm.className = 'edit'
    
    const saveEditBtn = document.createElement('button')
    saveEditBtn.type = 'submit'
    saveEditBtn.id = 'save-job-edit'
    saveEditBtn.dataset.id = index.id
    saveEditBtn.textContent = `${String.fromCodePoint('0x2712')} : Save Changes`

    const updateJobTitleLabel = document.createElement('label')
    updateJobTitleLabel.for = 'update-job-title'
    updateJobTitleLabel.textContent = "Updated Job Title: "

    const updateJobTitle = document.createElement('input')
    updateJobTitle.type = 'text'
    updateJobTitle.id = 'update-job-title'

    const updateJobDescLabel = document.createElement('label')
    updateJobDescLabel.for = 'update-job-description'
    updateJobDescLabel.textContent = "Updated Job Description: "

    const updateJobDesc = document.createElement('textarea')
    updateJobDesc.id = 'update-job-description'

    const updateJobStatusLabel = document.createElement('label')
    updateJobStatusLabel.for = "update-job-status"
    updateJobStatusLabel.textContent = "Updated Application Status:"

    const updateStatus = document.createElement('select')
    updateStatus.id = "update-job-status"
    const statuses = ["Watching","Applied","Interviewing", "Awaiting-response", "Offer-received","Offer-negotiating","Offer-accepted","Offer-declined"]
    
    statuses.forEach((status) => {
      const statusSelect = document.createElement('option')
      statusSelect.value = status
      if (status.includes('-')){
        statusSelect.textContent = status.split('-').join(' ')
      } else {
        statusSelect.textContent = status
      }
      updateStatus.append(statusSelect)
    })

    editForm.append(updateJobTitleLabel, updateJobTitle, updateJobDescLabel, updateJobDesc, updateJobStatusLabel, updateStatus, saveEditBtn)
    editContainer.appendChild(editForm)
    editContainer.style.display = 'none'
//edit form ends

    const expandButton = document.createElement('button')
    expandButton.className = 'expand'
    expandButton.id = 'expand-details'
    expandButton.textContent = `${String.fromCodePoint('0x2935')} : Expand`
    expandButton.dataset.id = index.id
    
    const deleteJobButton = document.createElement('button')
    deleteJobButton.className = 'delete'
    deleteJobButton.id = 'delete-job'
    deleteJobButton.textContent = `${String.fromCodePoint('0x1F5D1')}: Delete`
    deleteJobButton.dataset.id = index.id

    const jobDescP = document.createElement('p');
    jobDescP.textContent = index.description;
    
    const jobStatus = document.createElement('h5')
    jobStatus.textContent = `Application Status: ${index.status}`;
    
    const dreamJob = document.createElement('p');
    if (index.dream_job === true){
      dreamJob.textContent = `Dream Job Status: ${String.fromCodePoint('0x1F31F')}`
    }else{
      dreamJob.textContent = `Dream Job Status: ${String.fromCodePoint('0x1F937')}`
    }

    jobDetails.append(jobDescP, jobStatus, dreamJob, editJobButton,editContainer)
    jobListLi.append(expandButton, jobDetails, deleteJobButton)
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
    const jobSource = document.getElementById('new-job-source')
    const jobUrl = document.getElementById('new-job-url')
    const dreamJobStatus = document.getElementById('dream-job')

    const company = companyNameInput.value;
    let title = jobTitleInput.value;
    let description = jobDescInput.value;
    const source = jobSource.value;
    const url = jobUrl.value;
    const user_id = document.querySelector('#new-job-form').dataset.id

    let dream_job = false;
    if(dreamJobStatus.value === "on"){
      dream_job = true;
    }

    let status = jobAppStatus.value;

    companyNameInput.value = '';
    jobTitleInput.value = '';
    jobDescInput.value ='';
    jobSource.value = '';
    jobUrl.value='';

    return {company, title, description, source, url, user_id, dream_job};
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

  function handleDeleteJob(event){
    let delJobObj = {method: 'DELETE'}

    fetch(`http://localhost:3000/jobs/${event.target.dataset.id}`, delJobObj).then(removeJob(event))
  }

  function removeJob(event){
    event.target.parentElement.remove();
  }

  function handleJobEditSubmit(event){
    event.preventDefault();
    let updatedJob = grabJobUpdateData(event);
    patchUpdateJob(event, updatedJob)
  }

  function grabJobUpdateData(event){
    const updatedJobTitleField = event.target.parentElement.querySelector('#update-job-title')
    const updatedJobDescField = event.target.parentElement.querySelector('#update-job-description')
    const updatedJobStatusSelect = event.target.parentElement.querySelector('#update-job-status')
    title = updatedJobTitleField.value;
    description = updatedJobDescField.value;
    status = updatedJobStatusSelect.value;
    
    updatedJobTitleField.value="";
    updatedJobDescField.value='';
    updatedJobStatusSelect.value='';

    return {title, description, status}
    
  }

  function patchUpdateJob(event, updatedJob){
    let updateJobObj = {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(updatedJob)
    }

    fetch(`http://localhost:3000/jobs/${event.target.dataset.id}`, updateJobObj).then(response=>response.json()).then(data => renderUpdateJob(event, data))
  }

function renderUpdateJob(event, jobData){
  const updateThisLi = event.target.parentElement.parentElement.parentElement.parentElement

  console.log(updateThisLi, jobData)
}