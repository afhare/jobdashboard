class UsersController < ApplicationController
    def login
        user = User.find_or_create_by(username: params["username"])
        render json: user
    end
end