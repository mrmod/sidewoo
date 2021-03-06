class Employee < ApplicationRecord
  OWNER_ROLE = 0
  LEAD_ROLE = 1
  EMPLOYEE_ROLE = 2
  
  belongs_to :business
  belongs_to :location
  
  has_many :posts
  has_many :comments

  has_many :post_members
  has_many :posts, through: :post_members
end
