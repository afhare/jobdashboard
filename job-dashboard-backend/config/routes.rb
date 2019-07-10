Rails.application.routes.draw do
  resources :users
  post '/users/login', to: 'users#login'
  resources :jobs
  resources :tasks
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
