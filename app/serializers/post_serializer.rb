class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :link, :community_id, :user_id, :points, :created_at

  belongs_to :user
end