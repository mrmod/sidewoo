# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
map_data = []
File.open(File.join(Rails.root, 'sample_regions.json')) do |samples|
  j = JSON.load samples
  j.each do |points|
    map_data.push JSON.load(points)
  end
end
region_names = 5.times.map do 
  Faker::Nation.capital_city
end

business = Business.create!(
  name: Faker::Company.unique.name,
  address: Faker::Address.street_address,
  phone: Faker::PhoneNumber.phone_number,
  email: Faker::Internet.email,
)
(rand * map_data.size).to_i.times do 
  region = Region.create!(
    name: region_names.sample,
    points: map_data[(rand * map_data.size-1).to_i].to_json,
  )
end
business.locations.create!(
  name: Faker::Cannabis.strain,
  address: Faker::Address.street_address,
  city: Faker::Address.city,
  state: Faker::Address.state,
  postal: Faker::Address.zip,
  region: Region.all.sample,
  places_neighborhood: region_names.sample,
  places_id: 'place_id',
)
((rand * 10)+1).to_i.times do
  b = Business.create!(
    name: Faker::Company.unique.name,
    address: Faker::Address.street_address,
    phone: Faker::PhoneNumber.phone_number,
    email: Faker::Internet.email,
  )

  ((rand * 10)+1).to_i.times do

    b.locations.create!(
      name: Faker::Cannabis.strain,
      address: Faker::Address.street_address,
      city: Faker::Address.city,
      state: Faker::Address.state,
      postal: Faker::Address.zip,
      region: Region.all.sample,
      places_neighborhood: region_names.sample,
      places_id: 'place_id',
    )
  end
end
Business.all.each do |b|
  ((rand * 10)+1).to_i.times do
    role = (rand * 2).to_i + 1 
    if b.employees.count == 0
      role = Employee::OWNER_ROLE
    end

    b.employees.create!(name: Faker::Name.name, role: role, email: Faker::Internet.email)
  end
end

((rand * 10) + 1).to_i.times do
  e = Event.create!(
    name: Faker::Subscription.plan,
    theme: Faker::Marketing.buzzwords,
    description: Faker::Lorem.paragraph,
    start_time: Faker::Time.forward(days: (rand * 3).to_i),
    end_time: Faker::Time.forward(days: (rand * 20).to_i + 4),
    business: Business.all.sample,
  )
  ((rand * 5)+1).to_i.times do |n|
    employee = e.business.employees.sample
    if n % 2 == 0
      e.comments.create!(text: Faker::Lorem.paragraph, employee: employee)
    else
      e.comments.create!(text: Faker::Lorem.question, employee: employee)
    end
  end
end

((rand * 10)+1).to_i.times do
  b = Business.all.sample
  while b.employees.count == 0
    b = Business.all.sample
  end
  p = Post.create!(
    topic: Faker::Lorem.words.join(" "),
    text: Faker::Lorem.paragraph,
    employee: b.employees.sample,
  )
  (rand * 5).to_i.times do |n|
    text = Faker::Lorem.paragraph
    biz = b

    if n % 2 == 0
      text = Faker::Lorem.questions.join(". ")
      biz = Business.all.sample
      while biz.employees.count == 0
        biz = Business.all.sample
      end
    end

    employee = biz.employees.sample

    p.comments.create!(
      text: text,
      employee: employee,
    )
  end
end

Region.create!(name: Region::NEW_BUSINESS_REGION)
# group = BusinessGroup.create! name: "Group", description: "Description"
# group_member = BusinessGroupMember.create! business_group: group, business: business
