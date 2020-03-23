class Api::V1::PostTagsController < ApplicationController
    def create
        uploaded_file = params[:file]

        @post = Post.find_by_id params[:post_id]
        @tag = @post.tags.create! valid_params

        render json: @tag
    end

    def index
        @post = Post.find_by_id params[:post_id]
        render json: @post.tags
    end
    
    private
        def valid_params
            params.require(:tag).permit(
                :name,
                :value,
                :url,
                :taggable_id,
                :taggable_type,
            )
        end
end
