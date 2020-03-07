# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
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