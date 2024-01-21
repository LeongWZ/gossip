class Api::V1::CategoriesController < ApplicationController
  skip_before_action :authorized, only: [:index, :show]

  def index
    @categories = Category.order(:id).all
    render json: @categories
  end

  def show
    category = Category.find(params[:id])
    render json: category
  end

  def create
    category = Category.create(
      name: category_params[:name],
    )

    render json: category, status: :created
  end

  def destroy
    category = Category.find(category_params[:id])
    category.destroy

    render json: {
      message: "Category (id: #{category_params[:id]}) deleted successfully"
    }, status: :ok
  end

  def update
    category = Category.find(category_params[:id])
    category.name = category_params[:name]
    category.save

    render json: {
      message: "Category (id: #{category_params[:id]}) updated successfully"
    }, status: :ok
  end

  private

  def category_params
    params.require(:category).permit(:id, :name)
  end

end
