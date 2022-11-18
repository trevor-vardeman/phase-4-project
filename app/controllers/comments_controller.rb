class CommentsController < ApplicationController
  before_action :set_comment, only: [:destroy]
  before_action :authorize_user, only: [:destroy]
  before_action :authorize_vote, only: [:upvote, :downvote]

  def index
    comments = Comment.all.order(points: :desc)
    render json: comments, status: :ok
  end

  def create
    comment = Comment.create(
      user_id: current_user.id,
      post_id: params[:post_id],
      text: params[:text],
      points: params[:points]
    )
    if comment.valid?
      comment.comment_votes.create(user_id: current_user.id, points: params[:points])
      posts = Post.all.order(points: :desc)
      render json: posts, status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy      
    posts = Post.all.order(points: :desc)
    render json: posts, status: :ok
  end

  def upvote
    comment = Comment.find(params[:comment_id])
    comment_vote_array = comment.comment_votes.select { |vote| current_user.id == vote.user_id }
    comment_vote = comment_vote_array[0]
    if comment_vote_array.length > 0 && comment_vote.points == 1
      comment_vote.update(points: 0)
      render json: { update: "1" }, status: :accepted
    elsif comment_vote_array.length > 0 && comment_vote.points == 0
      comment_vote.update(points: 1)
      render json: { update: "2" }, status: :accepted
    elsif comment_vote_array.length > 0 && comment_vote.points == -1
      comment_vote.update(points: 1)
      render json: { update: "3" }, status: :accepted
    else
      comment.comment_votes.create(user_id: current_user.id, points: 1)
      render json: { update: "4" }, status: :accepted
    end
  end

  def downvote
    comment = Comment.find(params[:comment_id])
    comment_vote_array = comment.comment_votes.select { |vote| current_user.id == vote.user_id }
    comment_vote = comment_vote_array[0]
    if comment_vote_array.length > 0 && comment_vote.points == 1
      comment_vote.update(points: -1)
      render json: { update: "downvoted" }, status: :accepted
    elsif comment_vote_array.length > 0 && comment_vote.points == 0
      comment_vote.update(points: -1)
      render json: { update: "downvoted" }, status: :accepted
    elsif comment_vote_array.length > 0 && comment_vote.points == -1
      comment_vote.update(points: 0)
      render json: { update: "unvoted" }, status: :accepted
    else
      comment.comment_votes.create(user_id: current_user.id, points: params[:points])
      render json: comment, status: :accepted
    end
  end

  private

  def comment_params
    params.permit(:text, :post_id)
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def authorize_user
    user_can_modify = current_user.try(:admin) || current_user.id != nil && @comment.user_id == current_user.id
    render json: { error: "You don't have permission to perform that action." }, status: :forbidden unless user_can_modify
  end

  def authorize_vote
    user_can_modify = !session[:user_id].nil?
    render json: { error: "You must be logged in to vote." }, status: :forbidden unless user_can_modify
  end
end