class Api::V1::CommentsController < ApplicationController
  skip_before_action :authorized, only: [:index, :show]

  def index
    if params[:limit] && params[:post_id]
      @comments = limit.reverse
    else
      @comments = params[:post_id] ? Post.find(params[:post_id]).comments : Comment.all
    end

    render json: @comments
  end

  def show
    @comment = Comment.find(params[:id])
    render json: @comment
  end

  def create
    @comment = Comment.create(
      username: comment_params[:username],
      post_id: comment_params[:post_id],
      body: comment_params[:body]
    )
    render json: @comment
  end

  def destroy
    @comment = Comment.find(comment_params[:id])
    @comment.destroy
  end

  def update
    @comment = Comment.find(comment_params[:id])
    @comment.body = comment_params[:body]
    @comment.save
  end

  private

  def comment_params
    params.require(:comment)
  end

  def limit_params
    params.require(:limit)
  end

  def limit
    (params[:post_id] ? Post.find(params[:post_id]).comments : Comment).order(
        created_at: :desc
    ).limit(
      params[:limit]
    )
  end

end
