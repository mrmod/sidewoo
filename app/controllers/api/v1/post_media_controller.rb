class Api::V1::PostMediaController < ApplicationController
    def create
        uploaded_file = params[:file]

        s3_object = Medium.s3_create uploaded_file
        @post = Post.find_by_id params[:post_id]
        @media = @post.media.create! name: s3_object[:name], url: s3_object[:url]

        render json: {post: @post, media: @media}
    end

    def index
        @post = Post.find_by_id params[:post_id]
        render json: @post.media
    end
end
