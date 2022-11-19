class CommentVoteSerializer < ActiveModel::Serializer
  attributes :id, :comment_id, :user_id, :points
  
  belongs_to :user
  belongs_to :comment
end