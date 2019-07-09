class JobsController < ApplicationController
    def index
        jobs = Job.all
        render json: jobs
    end

    def create
        p params
        job = Job.create(jobparams)
        render json: job
    end

    private

    def jobparams
        params.require("job").permit("company", "title", "description", "applied_date", "interview_date", "deadline", "source", "url", "user_id", "dream_job")
    end
end