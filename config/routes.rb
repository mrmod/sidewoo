Rails.application.routes.draw do

  root to: 'home#index'

  # API
  namespace :api do
    resources :businesses, controller: 'v1/businesses' do
      get 'locations', action: :show_locations
      post 'locations', action: :create_location
      get 'employees', action: :show_employees
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :employees, controller: 'v1/employees' do 
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :event_invitations, controller: 'v1/event_invitations', only: [:create, :destroy]
    resources :social, controller: 'v1/social' do 
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :events, controller: 'v1/events' do 
      resources :comments, controller: 'v1/event_comments'
      resources :media, controller: 'v1/event_media'
      resources :tags, controller: 'v1/event_tags'
      resources :locations, controller: 'v1/locations'
      resources :pending_event_invitations, controller: 'v1/pending_event_invitations', only: [:show]
    end
    resources :posts, controller: 'v1/posts' do
      resources :comments, controller: 'v1/post_comments'
      resources :media, controller: 'v1/post_media'
      resources :tags, controller: 'v1/post_tags'
      resources :locations, controller: 'v1/locations'
    end
    resources :comments, controller: 'v1/comments' do
      resources :media, controller: 'v1/comment_media'
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
    resources :locations, controller: 'v1/locations' do
      get 'region', action: :show_region
    end
    resources :locations, controller: 'v1/locations', only: [:update, :show]
    resources :regions, controller: 'v1/regions', only: [:create, :show, :index] do
      get 'posts', action: :show_posts
      get 'events', action: :show_events
      get 'businesses', action: :show_businesses
    end
    resources :tags, controller: 'v1/tags'
    resources :media, controller: 'v1/media', only: [:show, :update, :delete]
  end
end