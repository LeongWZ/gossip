class RemoveUserPasswordAndBio < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :password_digest
    remove_column :users, :bio
  end
end
