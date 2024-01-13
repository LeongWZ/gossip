class CreateReplies < ActiveRecord::Migration[7.0]
  def change
    create_table :replies do |t|
      t.string :username
      t.text :body

      t.timestamps

      t.belongs_to :comment
    end
  end
end
