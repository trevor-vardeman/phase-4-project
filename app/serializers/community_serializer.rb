class CommunitySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :user_id
end