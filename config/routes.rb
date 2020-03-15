Rails.application.routes.draw do

  root to: 'home#index'

  # API
  namespace :api do
    resources :businesses, controller: 'v1/businesses' do 
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :employees, controller: 'v1/employees' do 
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :social, controller: 'v1/social' do 
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :events, controller: 'v1/events' do 
      resources :media, controller: 'v1/event_media'
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :posts, controller: 'v1/posts' do
      resources :comments, controller: 'v1/post_comments'
      resources :tags, controller: 'v1/tags'
      resources :locations, controller: 'v1/locations'
      resources :media, controller: 'v1/media'
    end
    resources :comments, controller: 'v1/comments' do 
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
    resources :locations, controller: 'v1/locations'
    resources :tags, controller: 'v1/tags'
    resources :media, controller: 'v1/media'
  end
end