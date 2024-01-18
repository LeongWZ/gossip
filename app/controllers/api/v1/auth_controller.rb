class Api::V1::AuthController < ApplicationController
  skip_before_action :authorized, only: [:login]
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  def login
    @user = User.find_by!(username: login_params[:username])
    @auth_token = encode_token(user_id: @user.id)
    render json: {
      auth_token: @auth_token
    }, status: :accepted
  end

  private

  def login_params
    params.require(:auth).permit(:username)
  end

  def handle_record_not_found(e)
    render json: { message: "User doesn't exist" }, status: :unauthorized
  end
end
