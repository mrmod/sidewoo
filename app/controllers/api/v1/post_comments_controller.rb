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

    def create
        @post = Post.find_by_id params[:post_id]
        if !@post
            return 404
        end
        @comment = @post.comments.create valid_params
        if @comment.invalid?
            render json: @comment.errors, status: 400
        else
            render json: @comment
        end
    end

    def update
        begin
            @comment = Comment.update params[:id], valid_params
            respond_to do |format|
            format.json { render json: @comment }
            end
        rescue ActiveModel::ForbiddenAttributesError => e          
            render json: {'notFound': params[:id], status: 404 }
        end
    end

    private
        def valid_params
            params.require(:comment).permit(
                :employee_id,
                :commentable_id,
                :commentable_type,
                :comment_id,
                :text
            )
        end
end
