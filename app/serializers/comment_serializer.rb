class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :points, :post_id, :created_at, :user, :user_upvoted, :user_downvoted

  belongs_to :user
  belongs_to :post
  has_many :comment_votes
  has_many :users, through: :comment_votes

  def user_upvoted
    if !current_user
      return false
    else current_user
      comment_vote_array = self.object.comment_votes.select { |vote| current_user.id == vote.user_id }
      comment_vote = comment_vote_array[0]
      if current_user && comment_vote_array.length > 0 && comment_vote.points == 1
        return true
      else return false
      end
    end
  end

  def user_downvoted
    if !current_user
      return false
    else current_user
      comment_vote_array = self.object.comment_votes.select { |vote| current_user.id == vote.user_id }
      comment_vote = comment_vote_array[0]
      if current_user && comment_vote_array.length > 0 && comment_vote.points == -1
        return true
      else return false
      end
    end
  end

  def points
    self.object.comment_votes.sum { |votes| votes[:points] } 
  end
end