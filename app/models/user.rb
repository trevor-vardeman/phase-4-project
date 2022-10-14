class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: { case_sensitive: false }

  has_many :communities
  has_many :comments
  has_many :posts, through: :comments

  acts_as_voter
end