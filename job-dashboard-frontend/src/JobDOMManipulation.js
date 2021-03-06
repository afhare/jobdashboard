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

    const updateListingNoteLabel = document.createElement('label')
    updateListingNoteLabel.for = 'update-listing-note'
    updateListingNoteLabel.textContent = "Updated Note(s) About This Job: "

    const updateListingNote = document.createElement('input')
    updateListingNote.type = 'text'
    updateListingNote.id = 'update-listing-notes'
    updateListingNote.value = index.listing_notes;

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

    editForm.append(updateListingNoteLabel, updateListingNote, updateJobStatusLabel, updateStatus, saveEditBtn)
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
    const jobDescH5 = document.createElement('h5')
    jobDescH5.textContent = "Job Description : "
    jobDescP.textContent = index.description;

    const listingNoteP = document.createElement('p');
    const listingNoteH5 = document.createElement('h5')
    listingNoteH5.textContent = "My Notes About This Listing : "
    listingNoteP.textContent = index.listing_notes;
    
    const jobStatus = document.createElement('p')
    const jobStatusH5 = document.createElement('h5')
    jobStatusH5.textContent = "Job Description : "
    jobStatus.textContent = index.status;
    
    const dreamJob = document.createElement('p');
    if (index.dream_job === true){
      dreamJob.textContent = `Dream Job Status: ${String.fromCodePoint('0x1F31F')}`
    }else{
      dreamJob.textContent = `Dream Job Status: ${String.fromCodePoint('0x1F937')}`
    }

    jobDetails.append(jobDescH5, jobDescP, listingNoteH5,listingNoteP, jobStatusH5,jobStatus, dreamJob, editJobButton,editContainer,deleteJobButton)
    jobListLi.append(expandButton, jobDetails)
    jobDetails.style.display = 'none'
    ulJobList.insertAdjacentElement('afterbegin',jobListLi)

    const taskSelection = document.querySelector('#new-task-form').querySelector('#new-task-job')
    const taskJobSelect = document.createElement('option')
    taskJobSelect.value = `${index.id}`
    taskJobSelect.textContent = `${index.company} - ${index.title}`
    taskSelection.append(taskJobSelect)
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
    const listingNoteInput = document.getElementById('new-listing-notes')

    const company = companyNameInput.value;
    let title = jobTitleInput.value;
    let description = jobDescInput.value;
    const source = jobSource.value;
    const url = jobUrl.value;
    const user_id = document.querySelector('#new-job-form').dataset.id
    let listing_notes = listingNoteInput.value;

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
    listingNoteInput.value='';

    return {company, title, description, source, status, url, user_id, dream_job, listing_notes};
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
    event.target.parentElement.parentElement.remove();
  }

  function handleJobEditSubmit(event){
    event.preventDefault();
    let updatedJob = grabJobUpdateData(event);
    patchUpdateJob(event, updatedJob)
  }

  function grabJobUpdateData(event){
    const updatedListingNoteField = event.target.parentElement.querySelector('#update-listing-notes')
    const updatedJobStatusSelect = event.target.parentElement.querySelector('#update-job-status')
    
    listing_notes = updatedListingNoteField.value;
    status = updatedJobStatusSelect.value;

    return {listing_notes, status}
    
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
  let updateThisLi = event.target.parentElement.parentElement.parentElement.parentElement
  updateThisLi.remove();
  renderSingleJob(jobData);
}