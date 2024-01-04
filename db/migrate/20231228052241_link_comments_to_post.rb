class LinkCommentsToPost < ActiveRecord::Migration[7.0]
  def change
    remove_column :comments, :post_id

    change_table :comments do |t|
      t.belongs_to :post
    end
  end
end
