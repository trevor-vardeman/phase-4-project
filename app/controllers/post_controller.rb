class PostController < ApplicationController

  def index
    # posts = Post.all.includes(:user).order(points: :desc)
    posts = Post.all.order(points: :desc)
    render json: posts, status: :ok
  end

  def create
    post = Post.create(post_params)
    if post.valid?
      render json: post, status: :created
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.permit(:title, :text, :link, :community_id, :user_id, :points)
  end

end