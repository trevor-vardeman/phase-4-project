class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :admin

  has_many :communities
  has_many :comments
  has_many :posts, through: :comments
end