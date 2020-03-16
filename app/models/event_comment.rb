class EventComment < ApplicationRecord
  belongs_to :event
  belongs_to :employee
  belongs_to :comment, optional: true
  has_many :tags, as: :taggable
  has_many :media, as: :mediumable

  validates :text, presence: true
end
