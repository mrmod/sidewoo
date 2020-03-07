class BusinessGroupMember < ApplicationRecord
  belongs_to :business_group
  belongs_to :business
end
