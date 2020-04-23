class Event < ApplicationRecord
  validates :name, presence: true
  validates :description, length: {minimum: 2}
  validates :start_time, presence: true # TODO: Validate it's in the future

  belongs_to :business
  belongs_to :parent, class_name: 'Event', optional: true
  belongs_to :region

  has_many :childevents, class_name: 'Event', foreign_key: 'parent_id'
  has_many :invitations, class_name: 'EventInvitation', foreign_key: :event_id
  has_many :comments, as: :commentable
  has_many :tags, as: :taggable
  has_many :locations, as: :locatable
  has_many :media, as: :mediumable
end