class PostVoteSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :user_id
  belongs_to :user
  belongs_to :post
end