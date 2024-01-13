class LinkRepliesToPostThoughComment < ActiveRecord::Migration[7.0]
  def change
    change_table :replies do |t|
      t.belongs_to :post
    end

    add_column :posts, :replies_count, :integer, default: 0
  end
end
