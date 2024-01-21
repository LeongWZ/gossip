class AddDefaultPostsCountToCategory < ActiveRecord::Migration[7.0]
  def change
    change_column :categories, :posts_count, :integer, default: 0
  end
end
