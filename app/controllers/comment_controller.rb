class CommentController < ApplicationController
  before_action :authorize_vote, only: [:upvote, :downvote]

  def index
    comments = Comment.all.order(points: :desc)
    render json: comments, status: :ok
  end

  def show
    comment = Comment.find(params[:id])
    if comment
      render json: comment, status: :ok
    else
      render json: { error: "Comment not found" }, status: :not_found
    end
  end

  def create
    comment = Comment.create(comment_params)
    if comment.valid?
      comment.comment_votes.create(user_id: current_user.id, points: params[:points])
      render json: comment, status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def upvote
    comment = Comment.find(params[:comment_id])
    upvote_user_id = User.find(params[:user_id]).id
    comment_vote_array = comment.comment_votes.select { |vote| upvote_user_id == vote.user_id }
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
    downvote_user_id = User.find(params[:user_id]).id
    comment_vote_array = comment.comment_votes.select { |vote| downvote_user_id == vote.user_id }
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
    params.permit(:user_id, :text, :points, :post_id)
  end

  def authorize_vote
    user_can_modify = !session[:user_id].nil?
    render json: { error: "You must be logged in to vote." }, status: :forbidden unless user_can_modify
  end
end