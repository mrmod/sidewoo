class Location < ApplicationRecord
    BUSINESS_LOCATION = 'Business'

    belongs_to :locatable, polymorphic: true
    belongs_to :region
    # TODO: Provide AR interface for PostLocation, EventLocation
    # PostLocation.find_by_region

    def self.regional_businesses(region)
        business_ids = Location.where(
            region: region,
            locatable_type: BUSINESS_LOCATION
        )
        .pluck(:locatable_id)

        Business.find business_ids
    end
end
