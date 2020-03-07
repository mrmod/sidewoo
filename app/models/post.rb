class Post < ApplicationRecord
  belongs_to :employee
  has_many :comments
  
  has_many :post_members
  has_many :employees, through: :post_members
  
  has_many :tags, as: :taggable
  has_many :media, as: :mediable
  # on_create :create_post_creator # Create a PostMember with the creating employee as a PostMember
end
