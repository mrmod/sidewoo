class Api::V1::PostsController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Post.all }
    end
  end

  def create
  end

  def delete
  end

  def update
  end
end
