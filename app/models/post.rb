class Post < ApplicationRecord
  validates :topic, presence: true
  validates :text, presence: true
  
  belongs_to :employee
  has_many :comments, as: :commentable
  
  has_many :post_members, dependent: :destroy # remove memberships on deletion
  has_many :employees, through: :post_members
  
  has_many :tags, as: :taggable
  has_many :media, as: :mediumable
  # on_create :create_post_creator # Create a PostMember with the creating employee as a PostMember
end
