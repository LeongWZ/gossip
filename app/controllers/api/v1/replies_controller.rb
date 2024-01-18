class Api::V1::RepliesController < ApplicationController
  skip_before_action :authorized, only: [:index, :show]

  def index
    @replies = params.has_key?(:comment_id) ? Comment.find(params[:comment_id]).replies : Reply.all

    sort unless not params.has_key?(:sort_by)
    limit unless not params.has_key?(:limit)

    render json: @replies.map{
      |reply| reply.as_json.merge!({ username: reply.user.username})
    }
  end

  def show
    reply = Reply.find(params[:id])

    render json: reply.as_json.merge!({ username: reply.user.username})
  end

  def create
    reply = Reply.create(
      user_id: reply_params[:user_id],
      comment_id: reply_params[:comment_id],
      post_id: reply_params[:post_id],
      body: reply_params[:body]
    )

    render json: reply.as_json.merge!({ username: reply.user.username}), status: :created
  end

  def destroy
    reply = Reply.find(reply_params[:id])
    reply.destroy

    render json: {
      message: "Reply (id: #{reply_params[:id]}) deleted successfully"
    }, status: :ok
  end

  def update
    reply = Reply.find(reply_params[:id])
    reply.body = reply_params[:body]
    reply.save

    render json: {
      message: "Reply (id: #{reply_params[:id]}) updated successfully"
    }, status: :ok
  end

  private

  def reply_params
    params.require(:reply).permit(:id, :user_id, :body, :comment_id, :post_id)
  end

  def limit
    @replies = @replies.limit(params[:limit])
  end

  def sort
    order_option = case params[:sort_by]
      when "new"
        { created_at: :desc }
      else
        :created_at
      end

    @replies = @replies.order(order_option)
  end
end
