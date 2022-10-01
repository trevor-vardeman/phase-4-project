class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :image_url, :community_id, :user_id, :points, :created_at

  belongs_to :user
  belongs_to :community
  has_many :comments
  has_many :users, through: :comments
end