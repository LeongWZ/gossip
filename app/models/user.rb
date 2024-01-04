class User < ApplicationRecord
  validates :username, uniqueness: true, length: { maximum: 38 }, format: { with: /\A\S*\z/ }
end
