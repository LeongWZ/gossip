Rails.application.routes.draw do
  # get 'homepage/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")

  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      resources :posts do
        resources :comments, only: [:index]
      end

      resources :comments do
        resources :replies, only: [:index]
      end

      resources :replies

      resources :categories do
        resources :posts, only: [:index]
      end

      post "/users", to: "users#create"
      get "/me", to: "users#me"
      post "/auth/login", to: "auth#login"
    end
  end

  get '*path', to: 'homepage#index', via: :all
end
