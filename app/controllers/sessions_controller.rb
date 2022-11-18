class SessionsController < ApplicationController

  def create
    user = User.find_by_username(params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: { error: "Invalid credentials" }, status: :unauthorized
    end
  end

  def destroy
    reset_session
    @current_user = nil
    posts = Post.all.order(points: :desc)
    render json: posts, status: :ok
  end
end