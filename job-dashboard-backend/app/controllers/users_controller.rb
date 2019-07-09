class UsersController < ApplicationController
    def login
        if params["username"]
            user = User.find_or_create_by(username: params["username"])
            render json: user
        end
    end

    def index
        users = User.all
        render json: users
    end

    def update
        p params
        # user = User.find_by(id: params[])
    end
end