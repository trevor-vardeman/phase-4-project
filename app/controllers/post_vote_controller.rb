class PostVoteController < ApplicationController
  before_action :authorize_vote, only: [:upvote]

  def upvote
    # post = Post.find(params[:id])
    # if current_user.voted_for? @post
    #   @post.unliked_by current_user
    # else
    #   @post.liked_by current_user
    # end
    # @post.upvote_from current_user
    # render json: @post, status: :accepted
    render json: {test: "test"}
  end

  private

  def post_vote_params
    params.permit(:post_id, :user_id, :points)
  end

  def authorize_vote
    user_can_modify = !session[:user_id].nil?
    render json: { error: "You must be logged in to vote." }, status: :forbidden unless user_can_modify
  end
end