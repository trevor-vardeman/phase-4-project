class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :image_url, :points, :created_at, :user_can_modify, :user_upvoted, :user_downvoted

  # belongs_to :user
  belongs_to :community
  has_many :comments
  has_many :users, through: :comments
  has_many :post_votes
  # has_many :users, through: :post_votes

  def user_can_modify
    # current_user.try(:admin) || current_user == self.object.user && current_user.id != nil
    current_user.try(:admin)
  end

  def user_upvoted
    if !current_user
      return false
    else current_user
      post_vote_array = self.object.post_votes.select { |vote| current_user.id == vote.user_id }
      post_vote = post_vote_array[0]
      if current_user && post_vote_array.length > 0 && post_vote.points == 1
        return true
      else return false
      end
    end
  end

  def user_downvoted
    if !current_user
      return false
    else current_user
      post_vote_array = self.object.post_votes.select { |vote| current_user.id == vote.user_id }
      post_vote = post_vote_array[0]
      if current_user && post_vote_array.length > 0 && post_vote.points == -1
        return true
      else return false
      end
    end
  end

  def points
    self.object.post_votes.sum { |votes| votes[:points] } 
  end

end