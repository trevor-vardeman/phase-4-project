class PostVoteController < ApplicationController
  before_action :authorize_vote, only: [:upvote]

  private

  def post_vote_params
    params.permit(:post_id, :user_id, :points)
  end

  def authorize_vote
    user_can_modify = !session[:user_id].nil?
    render json: { error: "You must be logged in to vote." }, status: :forbidden unless user_can_modify
  end
end