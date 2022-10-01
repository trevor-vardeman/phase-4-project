class CommunityController < ApplicationController

  def index
    communities = Community.all.order(:name)
    render json: communities, status: :ok
  end

  def create
    community = Community.create(community_params)
    if community.valid?
      render json: community, status: :created
    else
      render json: { errors: community.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def community_params
    params.permit(:name, :description)
  end

end