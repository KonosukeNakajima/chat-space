Rails.application.routes.draw do
  root to: 'groups#index'
  resources :groups, only: [:index]
    resources :messages, only: [:index] do
  end
end
