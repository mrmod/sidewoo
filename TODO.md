# Models

```
rails g model Business name:string address:text phone:string email:string website:text type:string employee_business:boolean handle:string --force
rails g model Employee name:string business:references role:integer handle:string --force
rails g model Social name:string url:text handle:string business:references --force
rails g model Event name:string theme:text description:text start_time:timestamp end_time:timestamp parent_id:bigint business:references --force
rails g model Post topic:text text:text private:boolean employee:references --force
rails g model Comment text:text post:references comment_id:bigint employee:references --force
rails g model BusinessGroup name:string description:text private:boolean --force
rails g model BusinessGroupMember business_group:references business:references --force
rails g model PostMember post:references employee:references role:integer --force

# Polymorphic types
rails g model Location address:text city:text country:string province:string state:string postal:string locatable_id:bigint locatable_type:string --force
rails g model Tag name:string value:string url:text taggable_id:bigint taggable_type:string --force
rails g model Medium url:text mediumable_id:bigint mediumable_type:string --force

# Defaults and settings
sed -i  -e 's/t\.integer :role$/t.integer :role, default: 0/' db/migrate/*_create_employees.rb
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
employee = Employee.create! name: 'Employee A', business:business

event = Event.create! name: 'Event', theme: 'Event Theme', description: 'Description', business: business

post = Post.create! topic: 'Topic', text: 'Text', employee: employee
post_member = PostMember.create! post: post, employee: employee, role: 0
comment_1 = Comment.create! text: 'Comment 1', post: post, employee: employee
comment_2 = Comment.create! text: 'Comment 2', post: post, employee: employee
comment_3 = Comment.create! text: 'Comment 3', post: post, comment: comment_2, employee: employee

group = BusinessGroup.create! name: 'Group', description: 'Description'
group_member = BusinessGroupMember.create! business_group: group, business:business
```