class Api::V1::PostsController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Post.all }
    end
  end
  def show
    @post = Post.find_by_id params[:id]
    respond_to do |format|
      format.json { render json: @post }
    end
  end

  def create
  end

  def delete
  end

  def update
  end
end
