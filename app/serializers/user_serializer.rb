class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :admin

  has_many :communities
  has_many :comments
  has_many :posts, through: :comments
  has_many :post_votes
  has_many :comment_votes
end