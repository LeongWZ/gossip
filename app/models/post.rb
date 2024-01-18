class Post < ApplicationRecord
  belongs_to :category, counter_cache: true
  belongs_to :user, counter_cache: true
  has_many :comments, dependent: :destroy
  has_many :replies, through: :comments
end
