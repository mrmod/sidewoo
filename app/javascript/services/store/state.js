export default {
    business: null,
    employee: null,
    businessLocations: [],
    // Can't use objects as store targets so this is a matrix
    businessEmployees: [],
    title: null,
    posts: [],
    events: [],
    businesses: [],
    media: [],
    comments: [],
    tags: [],
    post: null,
    event: null,
    regions: [],
    currentUser: {
        loggedIn: false,
        employee_id: null,
        business_id: null,
        name: null,
        email: null,
        session: null,
    }
}