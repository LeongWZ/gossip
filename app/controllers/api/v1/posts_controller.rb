class Api::V1::PostsController < ApplicationController
  skip_before_action :authorized, only: [:index, :show]

  def index
    if params[:q]
      @posts = search
    elsif params[:limit]
      @posts = limit
    else
      @posts = (params[:category_id] ? Category.find(params[:category_id]).posts : Post).order(
        (params[:sort_by] && params[:sort_by] == "top") ? {comments_count: :desc} : {created_at: :desc}
      ).all
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
      body: post_params[:body],
      category_id: post_params[:category_id]
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

  def search_params
    params.permit(:q, :limit)
  end

  def limit_params
    params.permit(:limit)
  end

  def search
    (params[:category_id] ? Category.find(params[:category_id]).posts : Post).where(
      "lower(title) LIKE ? or lower(body) LIKE ? or lower(username) LIKE ?",
      search_params[:q].downcase,
      search_params[:q].downcase,
      search_params[:q].downcase
    ).order(
      (params[:sort_by] && params[:sort_by] == "top") ? {comments_count: :desc} : {created_at: :desc}
    ).limit(
      search_params[:limit]
    )
  end

  def limit
    (params[:category_id] ? Category.find(params[:category_id]).posts : Post).order(
      (params[:sort_by] && params[:sort_by] == "top") ? {comments_count: :desc} : {created_at: :desc}
    ).limit(
      limit_params[:limit]
    )
  end

end
