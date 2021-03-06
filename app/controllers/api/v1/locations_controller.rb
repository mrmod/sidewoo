class Api::V1::LocationsController < ApplicationController
  def index
    render json: Location.all
  end

  def create
    @location = Location.create valid_params
    if @location.invalid?
      render json: @location.errors, status: 400
    else
      render json: @location
    end
  end

  def show
    @location = Location.find params[:id]
    if @location.present?
      render json: @location
    else
      render json: null, status: 404
    end
  end

  def update
    @location = Location.find_by_id params[:id]
    unless @location.present?
      render json: null, status: 404
      return
    end

    if @location.update valid_params
      render json: @location
    else
      render json: @location.errors, status: 400
    end
  end

  # GET /locations/:location_id/region
  def show_region
    @location = Location.find_by_id params[:location_id]
    if @location.present?
      render json: @location.region
    else
      render json: null, status: 404
    end
  end

  private
    def valid_params
      params.require(:location).permit(
        :name,
        :address,
        :city,
        :country,
        :province,
        :state,
        :postal,
        :locatable_id,
        :locatable_type,
        :region_id,
        :lat,
        :long,
        :primary,
        :business_id,
      )
    end
end
