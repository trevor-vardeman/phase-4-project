Rails.application.routes.draw do
  resources :users, only: [:create, :show, :index]
  resources :community, only: [:create, :show, :index]
  resources :posts, only: [:create, :index, :destroy]
  resources :comments, only: [:create, :index, :update, :destroy]
  resource :comment_vote, only: [:create, :index, :show]

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  patch "/upvote-post", to: "posts#upvote"
  patch "/downvote-post", to: "posts#downvote"
  patch "/upvote-comment", to: "comments#upvote"
  patch "/downvote-comment", to: "comments#downvote"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end