class PostController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :authorize_user, only: [:update, :destroy]

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

  def destroy
    post = Post.find(params[:id])
    post.destroy
  end

  private

  def post_params
    params.permit(:title, :text, :image_url, :community_id, :user_id, :points)
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def authorize_user
    user_can_modify = current_user.try(:admin) || current_user.id != nil && @post.user_id == current_user.id
    render json: { error: "You don't have permission to perform that action." }, status: :forbidden unless user_can_modify
  end

end