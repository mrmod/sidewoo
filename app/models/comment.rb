class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :employee
  belongs_to :comment, optional: true
  has_many :tags, as: :taggable
  has_many :media, as: :mediable

  validates :text, presence: true
end
