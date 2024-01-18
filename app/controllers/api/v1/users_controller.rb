class Api::V1::UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]
  rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_record
  rescue_from ActiveRecord::ValueTooLong, with: :handle_invalid_record

	def create
    user = User.create!(user_params)
    @auth_token = encode_token(user_id: user.id)
    render json: {
      token: @auth_token
    }, status: :created
  end

  def me
      render json: current_user, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end

  def handle_invalid_record(e)
    render json: {
      errors: e.record.errors.full_messages
    }, status: :unprocessable_entity
  end

end
