class Community < ApplicationRecord
  validates :name, uniqueness: { case_sensitive: false }

  belongs_to :user
  has_many :posts
end