class Event < ApplicationRecord
  belongs_to :business
  belongs_to :parent, class_name: 'Event', optional: true
  has_many :childevents, class_name: 'Event', foreign_key: 'parent_id'
end
