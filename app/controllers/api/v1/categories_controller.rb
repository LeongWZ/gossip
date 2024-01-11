class Api::V1::CategoriesController < ApplicationController
  skip_before_action :authorized, only: [:index, :show]

  def index
    @categories = Category.order(:id).all
    render json: @categories
  end

  def show
    @category = Category.find(params[:id])
    render json: @category
  end

end
