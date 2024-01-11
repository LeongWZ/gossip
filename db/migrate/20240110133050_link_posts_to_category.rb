class LinkPostsToCategory < ActiveRecord::Migration[7.0]
  def change
    change_table :posts do |t|
      t.belongs_to :category
    end
  end
end
