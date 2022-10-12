Rails.application.routes.draw do
  resources :users, only: [:create, :show]
  resources :community, only: [:create, :show, :index]
  resources :post
  resources :comment, only: [:create, :index, :show]

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  patch "/upvote-post", to: "post#upvote"
  patch "/downvote-post", to: "post#downvote"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end