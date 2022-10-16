class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :image_url, :points, :created_at, :user_can_modify, :user_upvoted

  belongs_to :user
  belongs_to :community
  has_many :comments
  has_many :users, through: :comments
  has_many :post_votes
  has_many :users, through: :post_votes

  def user_can_modify
    current_user.try(:admin) || current_user == self.object.user && current_user.id != nil
  end

  def user_upvoted
    if self.object.post_votes.select { |vote| current_user.id == vote.user_id }.length > 0
      return true
    else
      return false
    end
  end
end