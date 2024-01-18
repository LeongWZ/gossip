class LinkRepliesToUser < ActiveRecord::Migration[7.0]
  def change
    remove_column :replies, :username, :string

    change_table :replies do |t|
      t.belongs_to :user
    end

    add_column :users, :replies_count, :integer, default: 0
  end
end
