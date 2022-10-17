Rails.application.routes.draw do
  resources :users, only: [:create, :show]
  resources :community, only: [:create, :show, :index]
  resources :post
  resources :comment, only: [:create, :index, :show]
  resources :post_vote, only: [:create, :index, :show]

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  patch "/upvote", to: "post#upvote"
  patch "/downvote", to: "post#downvote"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end