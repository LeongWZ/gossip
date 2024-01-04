class ApplicationController < ActionController::Base
	before_action :authorized

	protect_from_forgery with: :null_session, only: -> { request.format.json? }
  # https://stackoverflow.com/questions/35181340/rails-cant-verify-csrf-token-authenticity-when-making-a-post-request

	# API key for JWT token
	API_KEY = ENV["API_KEY"]

	def encode_token(payload)
		JWT.encode(payload, API_KEY)
	end

	def decoded_token
		header = request.headers['Authorization']
		if header
			token = header.split(" ")[1]
			begin
				return JWT.decode(token, API_KEY)
			rescue JWT::DecodeError
				nil
			end
		end
	end

	def current_user
		if decoded_token
			user_id = decoded_token[0]['user_id']
			return User.find_by(id: user_id)
		end
	end

	def authorized
		unless !!current_user
			render json: { message: 'Please log in' }, status: :unauthorized
		end
	end

end
