class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :image_url, :points, :created_at, :user_can_modify

  belongs_to :user
  belongs_to :community
  has_many :comments
  has_many :users, through: :comments

  def user_can_modify
    current_user.try(:admin) || current_user == self.object.user && current_user.id != nil
  end
end