class Api::V1::PostCommentsController < ApplicationController
    def index
        @post = Post.find_by_id params[:post_id]
        if !@post
            return 404
        end
        respond_to do |format|
            format.json { render json: @post.comments }
        end
    end
end
