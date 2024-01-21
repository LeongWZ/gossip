class Api::V1::PostsController < ApplicationController
  skip_before_action :authorized, only: [:index, :show]

  def index
    @posts = params.has_key?(:category_id) ? Category.find(params[:category_id]).posts : Post.all

    search unless not params.has_key?(:q)
    sort unless not params.has_key?(:sort_by)
    limit unless not params.has_key?(:limit)

    render json: @posts.map{
      |post| post.as_json.merge!({ username: post.user.username})
    }
  end

  def show
    post = Post.find(params[:id])

    render json: post.as_json.merge!({ username: post.user.username})
  end

  def create
    post = Post.create(
      user_id: post_params[:user_id],
      title: post_params[:title],
      body: post_params[:body],
      category_id: post_params[:category_id]
    )

    render json: post.as_json.merge!({ username: post.user.username}), status: :created
  end

  def destroy
    post = Post.find(post_params[:id])
    post.destroy

    render json: {
      message: "Post (id: #{post_params[:id]}) deleted successfully"
    }, status: :ok
  end

  def update
    post = Post.find(post_params[:id])
    post.title = post_params[:title]
    post.body = post_params[:body]
    post.category_id = post_params[:category_id]
    post.save

    render json: {
      message: "Post (id: #{post_params[:id]}) updated successfully"
    }, status: :ok
  end

  private

  def post_params
    params.require(:post).permit(:id, :user_id, :title, :body, :category_id)
  end

  def search
    @posts = @posts.where(
      "title ILIKE ? or body ILIKE ? or user_id IN (?)",
      "%#{params[:q]}%",
      "%#{params[:q]}%",
      User.where("username ILIKE ?", "%#{params[:q]}%").map{|user| user.id}
    )
  end

  def limit
    @posts = @posts.limit(params[:limit])
  end

  def sort
    order_option = case params[:sort_by]
      when "top"
        { comments_count: :desc }
      else
        { created_at: :desc }
      end

    @posts = @posts.order(order_option)
  end

end
