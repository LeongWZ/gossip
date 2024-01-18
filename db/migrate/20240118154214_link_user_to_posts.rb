class LinkUserToPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :username, :string

    change_table :posts do |t|
      t.belongs_to :user
    end

    add_column :users, :posts_count, :integer, default: 0
  end
end
