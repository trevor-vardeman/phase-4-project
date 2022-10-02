class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :points, :post_id, :created_at, :user

  belongs_to :user
  belongs_to :post
end