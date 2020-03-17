# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
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