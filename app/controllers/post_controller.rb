class PostController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :authorize_user, only: [:update, :destroy]
  before_action :authorize_vote, only: [:upvote]

  def index
    @posts = Post.all.order(points: :desc)
    render json: @posts, status: :ok
  end

  def show
    @post = Post.find(params[:id])
    if @post
      render json: @post, status: :ok
    else
      render json: { error: "Post not found" }, status: :not_found
    end
  end

  def create
    @post = Post.create(post_params)
    if @post.valid?
      render json: @post, status: :created
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @post = Post.find(params[:id])
    @post.update(post_params)
    if @post.valid?
      render json: @post, status: :accepted
    else
      render json: { errors: @post.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
  end

  def upvote
    @post = Post.find(params[:id])
    if @post.post_votes.create(user_id: current_user.id)
      render json: @post, status: :accepted
    else 
      render json: { error: "Post already upvoted."}, status: :unprocessable_entity
    end
  end

  # def upvote
  #   @post = Post.find(params[:id])
  #   @post.upvote_from current_user
  #   render json: @post, status: :accepted
  # end

  # def upvote
  #   @post = Post.find(params[:id])
  #   if current_user.voted_for? @post
  #     @post.unliked_by current_user
  #   else
  #     @post.liked_by current_user
  #   end
  #   @post.upvote_from current_user
  #   render json: @post, status: :accepted
  # end

  # def downvote
  #   @post.downvote_from current_user
  #   render json: post, status: :accepted
  # end

  # def upvote
  #   @post = Post.find(params[:id])
  #   if current_user.voted_up_on? @post
  #     @post.unvote_by current_user
  #   else
  #     @post.upvote_by current_user
  #   end
  #   render json: @post, status: :accepted
  # end

  # def downvote
  #   @post = Post.find(params[:id])
  #   if current_user.voted_down_on? @post
  #     @post.unvote_by current_user
  #   else
  #     @post.downvote_by current_user
  #   end  
  #   render json: @post.voter_id, status: :accepted
  # end

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

  def authorize_vote
    user_can_modify = !session[:user_id].nil?
    render json: { error: "You must be logged in to vote." }, status: :forbidden unless user_can_modify
  end

end