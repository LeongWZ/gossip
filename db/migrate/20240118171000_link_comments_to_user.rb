class LinkCommentsToUser < ActiveRecord::Migration[7.0]
  def change
    remove_column :comments, :username, :string

    change_table :comments do |t|
      t.belongs_to :user
    end

    add_column :users, :comments_count, :integer, default: 0
  end
end
