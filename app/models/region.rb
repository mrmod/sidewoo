class Region < ApplicationRecord
  # belongs_to :business, through: :location
  has_many :locations
end
