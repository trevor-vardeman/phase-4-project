class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: { case_sensitive: false }
  
  has_many :communities
  has_many :comments
  has_many :posts, -> { distinct }, through: :comments
  has_many :post_votes
  has_many :comment_votes
end