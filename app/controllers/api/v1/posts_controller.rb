class Api::V1::PostsController < ApplicationController
  skip_before_action :authorized, only: [:index, :show]

  def index
    if params[:q] && params[:limit]
      # handle search query
      @posts = Post.where(
        "lower(title) like ?", "%#{params[:q].downcase}%"
        ).or(
          Post.where("lower(body) like ?", "%#{params[:q].downcase}%")
        ).order(
          created_at: :desc
        ).limit(
          params[:limit]
        )
    elsif params[:limit]
      @posts = Post.order(created_at: :desc).limit(params[:limit])
    else
      @posts = Post.order(created_at: :desc).all
    end

    render json: @posts
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  def create
    @post = Post.create(
      username: post_params[:username],
      title: post_params[:title],
      body: post_params[:body]
    )

    render json: @post
  end

  def destroy
    @post = Post.find(post_params[:id])
    @post.destroy
  end

  def update
    @post = Post.find(post_params[:id])
    @post.title = post_params[:title]
    @post.body = post_params[:body]
    @post.save
  end

  private

  def post_params
    params.require(:post)
  end

end
