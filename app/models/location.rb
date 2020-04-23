class Location < ApplicationRecord
    belongs_to :locatable, polymorphic: true
    belongs_to :region
    # TODO: Provide AR interface for PostLocation, EventLocation
    # PostLocation.find_by_region
end
