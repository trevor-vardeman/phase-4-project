class PostController < ApplicationController

  def index
    posts = Post.all.order(points: :desc)
    render json: posts, status: :ok
  end

  def show
    post = Post.find(params[:id])
    if post
      render json: post, status: :ok
    else
      render json: { error: "Post not found" }, status: :not_found
    end
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
    params.permit(:title, :text, :image_url, :community_id, :user_id, :points)
  end

end