class Post < ApplicationRecord
  # belongs_to :user
  belongs_to :community
  has_many :comments
  has_many :users, -> { distinct }, through: :comments
  has_many :post_votes
  # has_many :users, through: :post_votes
end