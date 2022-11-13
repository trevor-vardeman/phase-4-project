class Post < ApplicationRecord
  belongs_to :community
  has_many :comments
  has_many :users, -> { distinct }, through: :comments
  has_many :post_votes
end