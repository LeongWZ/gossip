class User < ApplicationRecord
  validates :username, uniqueness: true, length: { maximum: 38 }, format: { with: /\A\S*\z/ }

  has_many :posts
  has_many :comments
  has_many :replies
end
