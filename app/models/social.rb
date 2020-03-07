class Social < ApplicationRecord
  belongs_to :business
  has_many :posts
  has_many :comments
  has_many :tags, as: :taggable
  has_many :media, as: :mediumable
end
