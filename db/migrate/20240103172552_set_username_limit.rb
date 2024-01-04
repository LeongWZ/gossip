class SetUsernameLimit < ActiveRecord::Migration[7.0]
  def change
    User.destroy_all
    change_column :users, :username, :string, :limit => 38
  end
end
