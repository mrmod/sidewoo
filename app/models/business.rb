class Business < ApplicationRecord
    has_many :events
    has_many :employees
    has_many :socials

    has_many :business_group_members
    has_many :business_groups, through: :business_group_members

    has_many :tags, as: :taggable
    has_many :locations, as: :locatable
    has_many :media, as: :mediumable
    # has_many :posts, through: :employees
    # has_many :comments, through: :employees
end
