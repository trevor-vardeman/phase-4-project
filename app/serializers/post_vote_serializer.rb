class PostVoteSerializer < ActiveModel::Serializer
  attributes :id, :points, :post_id, :user_id
  belongs_to :user
  belongs_to :post
end