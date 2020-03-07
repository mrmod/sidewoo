class Api::V1::LocationsController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Location.all }
    end
  end

  def create
  end

  def delete
  end

  def update
  end
end
