class Post < ApplicationRecord
  belongs_to :user
  belongs_to :community
  has_many :comments
  has_many :users, through: :comments
  acts_as_votable
end