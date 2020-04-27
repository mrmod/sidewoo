class Comment < ApplicationRecord
  POST_COMMENT = 'Post'
  EVENT_COMMENT = 'Event'

  belongs_to :commentable, polymorphic: true
  belongs_to :employee
  belongs_to :comment, optional: true
  has_many :tags, as: :taggable
  has_many :media, as: :mediumable

  validates :text, presence: true

  # Always update the modified at on saving
  before_save { self.modified_at = Time.now }

  after_save :update_last_commented
  after_destroy :repoint_last_commented

  # Scope
  def self.most_recent_post_comment(post_id)
    where(
      commentable_type: POST_COMMENT,
      commentable_id: post_id
    )
    .order(:modified_at).last
  end

  def self.most_recent_event_comment(event_id)
    where(
      commentable_type: EVENT_COMMENT,
      commentable_id: event_id
    )
    .order(:modified_at).last
  end

  def update_last_commented
    if is_post_comment?
      post.update last_commented: Time.now
    elsif is_event_comment?
      event.update last_commented: Time.now
    end
  end

  def repoint_last_commented
    if is_post_comment?
      comment = Comment.most_recent_post_comment commentable_id
      if comment.present?
        post.update last_commented: comment.modified_at
      else
        post.update last_commented: nil
      end
    elsif is_event_comment?
      comment = Comment.most_recent_event_comment commentable_id
      if comment.present?
        event.update last_commented: comment.modified_at
      else
        event.update last_commented: nil
      end
    end
  end

  def is_post_comment?
    commentable_type == POST_COMMENT
  end

  def is_event_comment?
    commentable_type == EVENT_COMMENT
  end

  def post
    return nil unless is_post_comment?
    Post.find commentable_id
  end

  def event
    return nil unless is_event_comment?
    Event.find commentable_id
  end
end
