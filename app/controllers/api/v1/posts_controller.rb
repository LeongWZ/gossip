class Api::V1::PostsController < ApplicationController
  skip_before_action :authorized, only: [:index, :show, :search]

  def index
    if params[:q] && params[:limit] && params[:sort_by] == "top"
      @posts = search(params[:q], params[:limit], params[:sort_by])
    elsif params[:q] && params[:limit]
      @posts = search(params[:q], params[:limit])
    elsif params[:limit] && params[:sort_by] == "top"
      @posts = Post.order(comments_count: :desc).limit(params[:limit])
    elsif params[:limit]
      @posts = Post.order(created_at: :desc).limit(params[:limit])
    elsif params[:sort_by] == "top"
      @posts = Post.order(comments_count: :desc).all
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

  def search(query, limit, sort_by = "new")
    if sort_by == "top"
      @posts = Post.where(
        "lower(title) LIKE ? or lower(body) LIKE ? or lower(username) LIKE ?",
        query.downcase,
        query.downcase,
        query.downcase
      ).order(
        comments_count: :desc
      ).limit(
        params[limit]
      )
    else
      @posts = Post.where(
        "lower(title) LIKE ? or lower(body) LIKE ? or lower(username) LIKE ?",
        query.downcase,
        query.downcase,
        query.downcase
      ).order(
        created_at: :desc
      ).limit(
        params[limit]
      )
    end

    return @posts
  end

end
