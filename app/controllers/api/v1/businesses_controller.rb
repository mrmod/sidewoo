class Api::V1::BusinessesController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Business.all }
    end
  end

  def show
    puts "Finding #{params}"
    @business = Business.find_by_id params[:id]
    respond_to do |format|
      format.json { render json: @business }
    end
  end
end
