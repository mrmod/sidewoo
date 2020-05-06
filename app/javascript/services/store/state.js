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
    employees: [],
    regionalBusinesses: [],
    signup: {
        business: {},
        locations: [],
        employees: [],
    },

    currentUser: {
        loggedIn: true,
        isAuthenticating: false,
        employee_id: 1,
        business_id: 1,
        location_id: 1,
        name: null,
        email: null,
        session: null,
        employee: {},
        location: {},
        region: {id: 1},
    }
}