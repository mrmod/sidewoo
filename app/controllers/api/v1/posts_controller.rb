class Api::V1::PostsController < ApplicationController
  def index
    render json: Post.all, include: :tags
  end

  def show
    @post = Post.find_by_id params[:id]
    render json: @post, include: :tags
  end

  def create
    @post = Post.create valid_params
    render json: @post
  end

  def destroy
    begin
      Post.destroy params[:id]
      render json: {id: params[:id]}
    rescue ActiveRecord::RecordNotFound
      render json: null, status: 404
    end
  end

  def update
    begin
      @post = Post.update params[:id], valid_params
      render json: @post, include: :tags
    rescue ActiveModel::ForbiddenAttributesError => e
      render json: {'notFound': params[:id]}, status: 404
    end
  end

  private
    def valid_params
      params.require(:post).permit(
        :employee_id,
        :private,
        :topic,
        :text,
      )
    end
end
