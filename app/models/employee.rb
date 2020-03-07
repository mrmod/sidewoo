class Employee < ApplicationRecord
  belongs_to :business
  has_many :posts
  has_many :comments

  has_many :post_members
  has_many :posts, through: :post_members

  has_many :locations, as: :locatable
end
