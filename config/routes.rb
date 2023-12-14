Rails.application.routes.draw do
  # get 'homepage/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      resources :articles, only: [:index]
    end
  end
end
