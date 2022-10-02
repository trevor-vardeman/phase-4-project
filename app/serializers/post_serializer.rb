class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :image_url, :points, :created_at

  belongs_to :user
  belongs_to :community
  has_many :comments
  has_many :users, through: :comments
end