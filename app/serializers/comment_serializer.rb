class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :points, :post_id

  belongs_to :user
  belongs_to :post
end