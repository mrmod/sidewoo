class EventInvitation < ApplicationRecord
    validates :name, presence: true
    validates :host_business_id, presence: true
    validates :guest_business_id, presence: true
  
    belongs_to :event
    belongs_to :business, foreign_key: 'host_business_id'
    belongs_to :business, foreign_key: 'guest_business_id'
  end