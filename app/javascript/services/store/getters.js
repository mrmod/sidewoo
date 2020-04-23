export default {
    businesses: state => state.businesses,
    business: (state) => state.business,
    businessLocations: (state) => state.businessLocations,
    businessEmployees: (state) => (businessId) => {
        let employees = state.businessEmployees.find(tuple => tuple[0] === parseInt(businessId))
        return employees ? employees[1] : []
    },

    employee: (state) => state.employee,

    title: state => state.title,

    posts: state => state.posts,
    post: (state) => (id) => state.posts.find(p => (p.id === id)),
    postComments: (state) => (id) => state.comments.filter(c => c.commentable_type === 'Post' && c.commentable_id === id),
    postMedia: (state) => (id) => state.media.filter(m => m.mediumable_type === 'Post' && m.mediumable_id === id),
    postTags: (state) => (id) => state.tags.filter(t => t.taggable_type === 'Post' && t.taggable_id === id),

    events: state => state.events,
    event: (state) => (id) => state.events.find(e => (e.id === id)),
    eventComments: (state) => (id) => state.comments.filter(c => c.commentable_type === 'Event' && c.commentable_id === id),
    eventMedia: (state) => (id) => state.media.filter(m => m.mediumable_type === 'Event' && m.mediumable_id === id),
    eventTags: (state) => (id) => state.tags.filter(t => t.taggable_type === 'Event' && t.taggable_id === id),

    allComments: state => state.comments,
    comments: (state) => (type, id) => state.comments.filter(m => m.mediumable_type === type && m.mediumable_id === id),
    commentMedia: (state) => (id) => state.media.filter(m => m.mediumable_type === 'Comment' && m.mediumable_id === id),

    tags: (state) => (type, id) => state.tags.filter(t => t.taggable_type === type && t.taggable_id === id),
    regions: (state) => state.regions,
    defaultRegion: (state) => state.regions.find(r => r.name === "NEW_BUSINESS_REGION"),
    regionsNamed: (state) => (name) => state.regions.filter(r => r.name === name),
    region: (state) => (id) => state.regions.find(r => r.id === id),

    currentUser: (state) => state.currentUser,
    isLoggedIn: (state) => state.currentUser.loggedIn,

    id: (state) => state.route.params ? parseInt(state.route.params.id) : null,
}
