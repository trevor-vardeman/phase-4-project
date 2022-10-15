class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: { case_sensitive: false }
  has_many :communities
  has_many :comments
  has_many :posts, through: :comments
  has_many :post_votes
  has_many :posts, through: :post_votes
end