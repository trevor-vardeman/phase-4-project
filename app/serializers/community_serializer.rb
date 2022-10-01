class CommunitySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :user_id

  belongs_to :user
  has_many :posts
end