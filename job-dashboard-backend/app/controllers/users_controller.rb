class UsersController < ApplicationController
    def login
        if params["username"]
            user = User.find_or_create_by(username: params["username"])
            user.update_attributes(nickname: params["nickname"])
            render json: user
        end
    end

    def index
        users = User.all
        render json: users
    end

    def update 
        user = User.find_by(id: params["id"])
        if params["scratchpad"]
            user.update_attributes(scratchpad: params["scratchpad"])
        elsif params["goal"]
            user.update_attributes(goal: params["goal"])
        end
        render json: user
    end

    def show
        user = User.find_by(params[:id])
        render json: user
    end

    private
    def userparams
        params.require("user").permit("goal", "scratchpad")
    end
end