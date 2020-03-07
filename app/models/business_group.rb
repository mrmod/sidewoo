class BusinessGroup < ApplicationRecord
    has_many :business_group_members
    has_many :businesses, through: :business_group_members
end
