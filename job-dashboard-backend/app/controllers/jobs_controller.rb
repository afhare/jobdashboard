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

    def update
        p params
        job = Job.find_by(id: params["id"])
        job.update_attributes({title: params["title"], description: params["description"], status: params["status"]})
        render json: job
    end

    def destroy
        job = Job.find_by(id: params[:id])
        job.destroy
        render json: {message: 'Successfully destroyed'}
    end

    private

    def jobparams
        params.require("job").permit("company", "title", "description", "source", "url", "user_id", "dream_job", "id", "status")
    end
end