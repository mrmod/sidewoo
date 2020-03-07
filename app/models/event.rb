class Event < ApplicationRecord
  belongs_to :business
  belongs_to :parent, class_name: 'Event', optional: true
  has_many :childevents, class_name: 'Event', foreign_key: 'parent_id'
  has_many :tags, as: :taggable
  has_many :locations, as: :locatable
  has_many :media, as: :mediumable
end