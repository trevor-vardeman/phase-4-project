class UsersController < ApplicationController
  # def show
  #   user = User.find_by(id: session[:user_id])
  #   if user
  #     render json: user, status: :ok
  #   else
  #     render json: { error: "Not authorized" }, status: :unauthorized
  #   end
  # end

  # def create
  #   @user = User.create(user_params)
  #   if @user.valid?
  #     # render json: user, status: :created
  #     render json: { user: UserSerializer.new(@user) }, status: :created
  #   else
  #     render json: { error: "Failed to create user." }, status: :unprocessable_entity
  #   end
  # end

  # private

  # def user_params
  #   # params.permit(:username, :password)
  #   params.require(:user).permit(:username, :password)
  # end

  skip_before_action :authorized, only: [:create]

  def create
    @user = User.create(user_params)
    if @user.valid?
      @token = encode_token(user_id: @user.id)
      render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
    else
      render json: { error: 'failed to create user' }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :bio, :avatar)
  end

end