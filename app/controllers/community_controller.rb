class CommunityController < ApplicationController

  def index
    communities = Community.all.order(:name)
    render json: communities, status: :ok
  end

end