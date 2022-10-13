class Post < ApplicationRecord
  acts_as_votable
  belongs_to :user
  belongs_to :community
  has_many :comments
  has_many :users, through: :comments

  def users_id
    @post.user_id
  end
end