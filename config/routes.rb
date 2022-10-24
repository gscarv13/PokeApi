Rails.application.routes.draw do
  devise_for :users

  scope :trades do
    post '/buy', to: 'trades#buy'
    post '/sell', to: 'trades#sell'
  end

  resources :dashboard, only: [:index]

  # Defines the root path route ("/")
  root "home#index"
end
