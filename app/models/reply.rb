class Reply < ApplicationRecord
  belongs_to :comment, counter_cache: true
  belongs_to :post, counter_cache: true
  belongs_to :user, counter_cache: true
end
