class AddUsernameToPostAndComment < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :username, :string
    add_column :comments, :username, :string
  end
end
