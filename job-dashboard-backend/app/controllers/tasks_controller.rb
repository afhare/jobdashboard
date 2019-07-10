class TasksController < ApplicationController
    def index
        tasks = Task.all
        render json: tasks
    end

    def create
        p params
        task = Task.create(taskparams)
        render json: task
    end

    def destroy
        task = Task.find_by(id: params[:id])
        task.destroy
        render json: {message: 'Successfully destroyed'}
    end

    private

    def taskparams
        params.require("task").permit("activity", "user_id", "job_id", "due_by")
    end
end