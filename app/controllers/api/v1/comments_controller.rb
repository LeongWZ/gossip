class Api::V1::CommentsController < ApplicationController
  skip_before_action :authorized, only: [:index, :show]

  def index
    @comments = params.has_key?(:post_id) ? Post.find(params[:post_id]).comments : Comment.all

    search unless not params.has_key?(:q)
    sort unless not params.has_key?(:sort_by)
    limit unless not params.has_key?(:limit)

    render json: @comments
  end

  def show
    render json: Comment.find(params[:id])
  end

  def create
    comment = Comment.create(
      username: comment_params[:username],
      post_id: comment_params[:post_id],
      body: comment_params[:body]
    )

    render json: comment, status: :created
  end

  def destroy
    comment = Comment.find(comment_params[:id])
    comment.destroy

    render json: {
      message: "Comment (id: #{comment_params[:id]}) deleted successfully"
    }, status: :ok
  end

  def update
    comment = Comment.find(comment_params[:id])
    comment.body = comment_params[:body]
    comment.save

    render json: {
      message: "Comment (id: #{comment_params[:id]}) updated successfully"
    }, status: :ok
  end

  private

  def comment_params
    params.require(:comment).permit(:id, :username, :body, :post_id)
  end

  def search
    @comments = @comments.where(
      "body ILIKE ? or username ILIKE ?",
      "%#{params[:q]}%",
      "%#{params[:q]}%"
    )
  end

  def limit
    @comments = @comments.limit(params[:limit])
  end

  def sort
    order_option = case params[:sort_by]
      when "top"
        { replies_count: :desc }
      else
        { created_at: :desc }
      end

    @comments = @comments.order(order_option)
  end

end
