
export const Business = {
    name: String,
    address: String,
    phone: String,
    email: String,
    website: String,
    type: String,
    employee_business: Boolean
}
export const Location = {
    name: String,
    address: String,
    city: String,
    country: String,
    province: String,
    state: String,
    postal: String,
    locatable_id: Number,
    locatable_type: String,
    region_id: Number,
    lat: Number,
    long: Number,
    primary: Boolean,
    places_id: String,
    places_neighborhood: String,
}
export const Employee = {
    name: String,
    email: String,
    business_id: Number,
    role: Number,
    handle: String,
    location_id: Number,
}
export const EmployeeRole = {
    owner: 0,
    lead: 1,
    employee: 2,
}
export const Region = {
    name: String,
    points: String,
}
export const Post = {
    topic: String,
    text: String,
    private: Boolean,
    employee_id: Number,
    region_id: Number,
}
export const Event = {
    name: String,
    theme: String,
    description: String,
    all_day: Boolean,
    start_time: String,
    end_time: String,
    parent_id: Number,
    business_id: Number,
    region_id: Number,
}
export const Comment = {
    text: String,
    comment_id: Number,
    employee_id: Number,
    commentable_type: String,
    commentable_id: Number,
}
export const Media = {
    name: String,
    url: String,
    description: String,
    mediumable_id: Number,
    mediumable_type: String,
    content_type: String,
}

export const placeHolders = {
    googleMapsAddress: '123 Something St. New York, NY',
}