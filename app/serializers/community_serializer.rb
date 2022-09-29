class CommunitySerializer < ActiveModel::Serializer
  attributes :id, :name, :title, :description, :user_id
end