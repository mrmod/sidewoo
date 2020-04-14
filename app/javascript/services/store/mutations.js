export default {
    business(state, business) {
        state.business = business
    },
    businesses(state, businesses) {
        state.businesses = businesses
    },
    businessLocations(state, locations) {
        state.businessLocations = locations
    },
    businessEmployees(state, data) {
        // [ [bizId, employees] ]
        let index = -1
        state.businessEmployees.forEach((tuple, idx) => {
            if (tuple[0] === data.business) {
                index = idx
            }
        })
        if (index > -1) {
            state.businessEmployees[index] = [data.business, data.employees]
        }
        state.businessEmployees.push([data.business, data.employees])
    },

    employee(state, employee) {
        state.employee = employee
    },

    title(state, title) {
        state.title = title
    },
    posts(state, posts) {
        state.posts = posts
    },

    post(state, post) {
        state.post = post
    },
    updatePosts(state, post) {
        let index = -1
        state.posts.forEach((p, idx) => {
            if (p.id === post.id) {
                index = idx
            }
        })
        if (index >= 0) {
            state.posts[index] = post
        } else {
            state.posts.push(post)
        }
    },

    deletePost(state, id) {
        state.posts = state.posts.filter(p => p.id !== id)
    },
    
    events(state, events) {
        state.events = events
    },
    event(state, event) {
        state.event = event
    },
    updateEvents(state, event) {
        let index = -1
        state.events.forEach((e, idx) => {
            if (e.id === event.id) {
                index = idx
            }
        })
        if (index >= 0) {
            state.events[index] = event
        } else {
            state.events.push(event)
        }
    },
    deleteEvent(state, id) {
        state.events = state.events.filter(e => e.id !== id)
    },

    updateComments(state, comment) {
        let index = -1
        state.comments.forEach((c, idx) => {
            if (c.id === comment.id) {
                index = idx
            }
        })
        if (index >= 0) {
            state.comments[index] = comment
        } else {
            state.comments.push(comment)
        }
    },
    deleteComment(state, id) {
        state.comments = state.comments.filter(c => c.id !== id)
    },

    updateMedia(state, media) {
        let index = -1
        state.media.forEach((m, idx) => {
            if (m.id === media.id) {
                index = idx
            }
        })
        if (index >= 0) {
            state.media[index] = media
        } else {
            state.media.push(media)
        }
    },

    updateRegions(state, region) {
        let index = -1
        state.regions.forEach((r, idx) => {
            if (r.id === region.id) {
                index = idx
            }
        })
        if (index >= 0) {
            state.regions[index] = region
        } else {
            state.regions.push(region)
        }
    },
    updateBusinessLocations(state, location) {
        let index = -1
        state.businessLocations.forEach((l, idx) => {
            if (l.id === location.id) {
                index = idx
            }
        })
        if (index >= 0) {
            state.businessLocations[index] = location
        } else {
            state.businessLocations.push(location)
        }
    },
}