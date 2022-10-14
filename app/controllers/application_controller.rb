class ApplicationController < ActionController::API
  include ActionController::Cookies

  private

  # def current_user
  #   User.find_by(id: session[:user_id])
  # end

  def current_user
    return unless session[:user_id]
    @current_user ||= User.find(session[:user_id])
  end

end