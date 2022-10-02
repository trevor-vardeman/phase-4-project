class CommentController < ApplicationController

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
      render json: comment, status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.permit(:user_id, :text, :points, :post_id)
  end
end