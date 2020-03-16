class Api::V1::CommentMediaController < ApplicationController
    def create
        uploaded_file = params[:file]

        s3_object = Medium.s3_create uploaded_file
        @comment = Comment.find_by_id params[:comment_id]
        @media = @comment.media.create! name: s3_object[:name], url: s3_object[:url]

        render json: {comment: @comment, media: @media}
    end

    def index
        @comment = Comment.find_by_id params[:comment_id]
        render json: @comment.media
    end
end
