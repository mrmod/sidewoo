class Region < ApplicationRecord
  NEW_BUSINESS_REGION = "NEW_BUSINESS_REGION"
  ALL_BUSINESS_REGION = "ALL_BUSINESS_REGION"

  # belongs_to :business, through: :location
  has_many :locations
  has_many :posts
  has_many :events
end
