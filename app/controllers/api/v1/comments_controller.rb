class Api::V1::CommentsController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Comment.all }
    end
  end

  def create
  end

  def delete
  end

  def update
  end
end
