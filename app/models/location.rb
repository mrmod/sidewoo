class Location < ApplicationRecord
    belongs_to :locatable, polymorphic: true
    belongs_to :region
end
