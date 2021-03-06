# Review on April 2

Things look good so far. Below are the things we talked about and wanted to get done for the next few days.

# Bugs
* Adding an image to an Event fails to reload the comment data
* Private posts feature ; tagging in people
* Refresh of resourceful pages loses the store data since there's no resource information in the route [Done]
* Editability of Events, Posts, and Comments isn't checking permissions properly [Done]

# Things

* Posts don't need tags right now [Done]
* Ability to create locations for a business [Done]
* Posts should be the default view [Done]
* Who commented and when they commented [Done]
* Capture the center for a Places-derived region [Done]
* Maybe make comments more distinct from the rest of the page? [Done]
* Set the Region of a registering businesses's first employee to that of the Primary Location during SignUp [Done]
* Posts should be sortable by `post.created_at` and latest commented [Done]
* Neighbors should show the other businesses in the same region [Done]
** Triggered from a click on MyBusiness.Location showing a list of them broken down by category
* Keep the business category information and founding information with the My Business page
* Ability to add new locations to an existing business
* Estimate the center for a Business-derived region polygon
* Allow add/remove/modify of business employees after a business is created

## Marketing

* When a region is created, a GoogleBusiness search will find businesses in the region and email them

* **BUG** Toggling a location on and off in the locations step of SignUp throws errors 
* Ensure employee addresses are unique for employees of a business

# Features

* A side bar of post topics on the left for Posts section (crime & safety, marketplace, civic information, etc) [Done]
* Neighborhood creation [Done]
* Posts should show up for the Region of the logged in Employee by default [Done]
* A side bar allowing the Neighborhood selection for Posts and Events
* Events calendar

## Feature: Check if Business Location in Region

When a Business joins and gives their address, a check should be done to see if that addresses Lat/Long are within an existing Region. If it is, then their Location gets put in that region. If it isn't, they should be able to create a new Region.

### Migrations

#### Most recent commented data

```
rails g migration AddLastCommentedToPost last_commented:datetime
sed -i  's/\(add_column.*\)$/\1, default: -> { "CURRENT_TIMESTAMP" }/' db/migrate/*_add_last_commented_to_post.rb
rails g migration AddLastCommentedToEvent last_commented:datetime
sed -i  's/\(add_column.*\)$/\1, default: -> { "CURRENT_TIMESTAMP" }/' db/migrate/*_add_last_commented_to_event.rb

rails g migration AddTimestampsEverywhere
```

#### Store Google places information
```
rails g migration AddGooglePlacesToLocation places_id:string places_neighborhood:string
rails g migration AddEmailToEmployee email:string
```

#### Hinting about the center of a region
```
rails g migration AddGeoToRegion center_lat:decimal center_lng:decimal
```

#### Region of where a post is from

To put a Post/Event in many regions, one Post/Event per Region is created

```
rails g migration AddRegionToPost region:references
rails g migration AddRegionToEvent region:references
rails g migration AddLocationToEmployee location:references
```

#### Comment creation date
```
rails g migration AddModifiedAtToComment modified_at:datetime
sed -i.bak 's/\(add_column.*\)$/\1, default: -> { "CURRENT_TIMESTAMP" }/' db/migrate/*_add_modified_at_to_comment.rb
```

## Feature: Neighborhood creation [Done]

When a business creates a location for itself and it isn't inside of any Region then the business should be allowed to draw a new region and be set as the leader of that region.

A location belongs to a Region
```
# A Region has many location
rails g model Region name:string points:text
rails g migration AddRegionToLocation region:references
rails g migration AddLatLongToLocation lat:decimal long:decimal
rails g migration AddPrimaryToLocation primary:boolean
sed -i  -e 's/null: false/null: true/' db/migration/*add_region_to_location.rb
```
s
### Dev Api Key

`GOOGLE_API_CREDENTIALS`

Restricted to Maps Javascript API from localhost or localhost/*

### Goals

* Ability to create regions [Done]
* Ability to see regions for business locations [Done]

# Locality

* Select Event radius to display Events from
* Select Events in Neighborhoods

# Models

```
rails g migration CreateBusinesses name:string address:text phone:string email:string website:text type:string employee_business:boolean handle:string --force
rails g migration CreateEmployees name:string business:references role:integer handle:string --force
rails g migration CreateSocials name:string url:text handle:string business:references --force
rails g migration CreateEvents name:string theme:text description:text all_day:boolean start_time:timestamp end_time:timestamp parent_id:bigint business:references --force
rails g migration CreateEventTimes name:string description:text all_day:boolean start_date:timestamp start_time:timestamp end_date:timestamp end_time:timestamp business:references --force
rails g migration CreatePosts topic:text text:text private:boolean employee:references --force
rails g migration CreateBusinessGroups name:string description:text private:boolean --force
rails g migration CreateBusinessGroupMembers business_group:references business:references --force
rails g migration CreatePostMembers post:references employee:references role:integer --force
rails g migration CreateEventInvitation name:text host_business_id:bigint guest_business_id:bigint event:references redemption_code:string

# Polymorphic types
rails g migration CreateLocations name:text address:text city:text country:string province:string state:string postal:string locatable_id:bigint locatable_type:string --force
rails g migration CreateTags name:string value:string url:text taggable_id:bigint taggable_type:string --force
rails g migration CreateMedia name:text url:text description:text mediumable_id:bigint mediumable_type:string content_type:string --force
rails g migration CreateComments text:text comment_id:bigint employee:references commentable_type:string commentable_id:bigint --force

# Defaults and settings
sed -i  -e 's/t\.integer :role$/t.integer :role, default: 0/' db/migrate/*_create_employees.rb
sed -i  -e 's/t\.boolean :private$/t.boolean :all_day, default: false/' db/migrate/*_create_events.rb
sed -i  -e 's/t\.boolean :private$/t.boolean :all_day, default: false/' db/migrate/*_create_event_times.rb
sed -i  -e 's/t\.boolean :private$/t.boolean :private, default: false/' db/migrate/*_create_posts.rb
sed -i  -e 's/t\.boolean :private$/t.boolean :private, default: false/' db/migrate/*_create_business_groups.rb
sed -i  -e 's/t\.integer :role$/t.integer :role, default: 0/' db/migrate/*_create_post_members.rb

# And done!
rails db:migrate
```
## Migrations modifications

* Employee: role is 0, 1, 2 : owner, lead, basic DEFAULT 0
`sed -i  -e 's/t\.integer :role$/t.integer :role, default: 0/' db/migrate/*_create_employees.rb`
* Post: private DEFAULT false
`sed -i  -e 's/t\.boolean :private$/t.boolean :private, default: false/' db/migrate/*_create_posts.rb`
* BusinessGroup: private DEFAULT false
`sed -i  -e 's/t\.boolean :private$/t.boolean :private, default: false/' db/migrate/*_create_business_groups.rb`
* PostMember: role is 0, 1, 2 : owner, lead, basic DEFAULT 0
`sed -i  -e 's/t\.integer :role$/t.integer :role, default: 0/' db/migrate/*_create_post_members.rb`

```
sed -i  -e 's/t\.integer :role$/t.integer :role, default: 0/' db/migrate/*_create_employees.rb
sed -i  -e 's/t\.boolean :private$/t.boolean :private, default: false/' db/migrate/*_create_posts.rb
sed -i  -e 's/t\.boolean :private$/t.boolean :private, default: false/' db/migrate/*_create_business_groups.rb
sed -i  -e 's/t\.integer :role$/t.integer :role, default: 0/' db/migrate/*_create_post_members.rb
```

## Hard Reset
```
rails db:environment:set RAILS_ENV=development 
rails db:drop
rm db/migrate/*
rm app/models/business* app/models/comment.rb  app/models/e*.rb app/models/location.rb app/models/medium.rb app/models/post* app/models/social.rb app/models/tag.rb
```

## Business Model
```
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
```

## Social Model
```
class Social < ApplicationRecord
  belongs_to :business
  has_many :posts
  has_many :comments
  has_many :tags, as: :taggable
  has_many :media, as: :mediumable
end
```

## Event Model
```
class Event < ApplicationRecord
  belongs_to :business
  belongs_to :parent, class_name: 'Event', optional: true
  has_many :childevents, class_name: 'Event', foreign_key: 'parent_id'
  has_many :tags, as: :taggable
  has_many :locations, as: :locatable
  has_many :media, as: :mediumable
end
```

## Employee Model
```
belongs_to :business
has_many :posts
has_many :comments

has_many :post_members
has_many :posts, through: :post_members

has_many :locations, as: :locatable
```

## Post Model
```
class Post < ApplicationRecord
  belongs_to :employee
  has_many :comments
  
  has_many :post_members
  has_many :employees, through: :post_members
  
  has_many :tags, as: :taggable
  has_many :media, as: :mediable
  # on_create :create_post_creator # Create a PostMember with the creating employee as a PostMember
end
```

## Comment Model
```
class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :employee
  belongs_to :comment, optional: true
  has_many :tags, as: :taggable
  has_many :media, as: :mediable
end
```

## BusinessGroup Model
```
class BusinessGroup < ApplicationRecord
    has_many :business_group_members
    has_many :businesses, through: :business_group_members
end
```

## BusinessGroupMember Model
```
class BusinessGroupMember < ApplicationRecord
  belongs_to :business_group
  belongs_to :business
end
```

## PostMember Model
```
belongs_to :post
belongs_to :employee
```


# Seeds

```
business = Business.create! name: 'Business', address: '1 Address St. Place, CA 90210', phone: '123-456-7890', email: 'test@sidewoo.com'
business.tags.create! name: 'BusinessRegion', value: 'Main'
business.locations.create! address: '1 Downtown St.', city: 'Town', state: 'CA', postal: '90120'

employee = Employee.create! name: 'Employee A', business:business
employee_b = Employee.create! name: 'Employee B', business:business

event = Event.create! name: 'Event', theme: 'Event Theme', description: 'Description', business: business, start_time: DateTime.now, end_time: DateTime.now
[1,2,3].each do |n|
  event.comments.create! text: "Event comment #{n}", employee: employee
end
event.comments.create! text: "Event comment from employee B", employee: employee_b

event.media.create! name:'MainFlyer', url: 'MainFlyerURL'

post = Post.create! topic: 'Topic', text: 'Text', employee: employee
post_member = PostMember.create! post: post, employee: employee, role: 0
[1,2,3].each do |n|
  post.comments.create! text: "Post comment #{n}", employee: employee
end
post.comments.create! text: "Post comment from employee B", employee: employee_b

group = BusinessGroup.create! name: 'Group', description: 'Description'
group_member = BusinessGroupMember.create! business_group: group, business: business
```


# Feature Controllers

```
rails g controller Home index --force
rails g controller Events index --force
rails g controller Groups index --force
```
# API Controllers

## Business
```
rails g controller Api::V1::Businesses index create delete update--force
```
## Social
```
rails g controller Api::V1::Social index create delete update --force
```
## Event
```
rails g controller Api::V1::Events index create delete update --force
```
## Employee
```
rails g controller Api::V1::Employees index create delete update --force
```
## Post
```
rails g controller Api::V1::Posts index create delete update --force
```
## Comment
```
rails g controller Api::V1::Comments index create delete update --force
```
## BusinessGroup
```
rails g controller Api::V1::BusinessGroups index create delete update --force
```
## BusinessGroupMember
```
rails g controller Api::V1::BusinessGroupMembers index create delete --force
```
## PostMember
```
rails g controller Api::V1::PostMembers index create delete --force
```
## Location
```
rails g controller Api::V1::Locations index create delete update --force
```
## Tag
```
rails g controller Api::V1::Tags index create delete update --force
```
## Medium
```
rails g controller Api::V1::Media index create delete update --force
```

## All API Controllers
```
rails g controller Api::V1::Businesses index create delete update --force
rails g controller Api::V1::Social index create delete update --force
rails g controller Api::V1::Events index create delete update --force
rails g controller Api::V1::Employees index create delete update --force
rails g controller Api::V1::Posts index create delete update --force
rails g controller Api::V1::Comments index create delete update --force
rails g controller Api::V1::BusinessGroups index create delete update --force
rails g controller Api::V1::BusinessGroupMembers index create delete --force
rails g controller Api::V1::PostMembers index create delete --force
rails g controller Api::V1::Locations index create delete update --force
rails g controller Api::V1::Tags index create delete update --force
rails g controller Api::V1::Media index create delete update --force
rails g controller Api::V1::PostComments index --force
```

# Routes

```
Rails.application.routes.draw do

  root to: 'home#index'
  resources :events, only: [:index]
  resources :groups, only: [:index]

  # API
  namespace :api do
    resources :businesses, controller: 'v1/businesses' do 
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :employees, controller: 'v1/employees' do 
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :social, controller: 'v1/social' do 
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :events, controller: 'v1/events' do 
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :posts, controller: 'v1/posts' do
      resources :comments, controller: 'v1/post_comments'
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :comments, controller: 'v1/comments' do 
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :business_groups, controller: 'v1/business_groups' do 
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :business_group_members, controller: 'v1/business_group_members'
    resources :post_members, controller: 'v1/post_members'
    resources :locations, controller: 'v1/locations'
    resources :tags, controller: 'v1/tags'
    resources :media, controller: 'v1/media'
  end
end
```