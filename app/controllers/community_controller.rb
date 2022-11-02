class CommunityController < ApplicationController
  before_action :authorize_submission, only: [:create]

  def index
    communities = Community.all.order(:name)
    render json: communities, status: :ok
  end

  def create
    community = Community.create(
      user_id: current_user.id,
      name: params[:name],
      description: params[:description]
    )
    if community.valid?
      render json: community, status: :created
    else
      render json: { error: community.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def community_params
    params.permit(:name, :description)
  end

  def authorize_submission
    user_can_modify = !session[:user_id].nil?
    render json: { error: "You must be logged in create a community." }, status: :forbidden unless user_can_modify
  end

end