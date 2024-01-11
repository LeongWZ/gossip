class Post < ApplicationRecord
  belongs_to :category, counter_cache: true
  has_many :comments, dependent: :destroy
end
