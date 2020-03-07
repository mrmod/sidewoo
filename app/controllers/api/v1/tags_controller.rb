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

  def delete
  end

  def update
  end
end
