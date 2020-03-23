class Api::V1::TagsController < ApplicationController
  def index
    puts "Showing #{params}"
    respond_to do |format|
      format.json { render json: Tag.all }
    end
  end
  
  def show
    puts "Showing #{params}"
  end

  def create
  end

  def destroy
    begin
      Tag.destroy params[:id]
      render json: {id: params[:id]}
    rescue ActiveRecord::RecordNotFound
      render json: nil, status: 404
    end
  end

  def update
  end
end
