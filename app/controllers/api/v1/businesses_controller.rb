class Api::V1::BusinessesController < ApplicationController
  def index
    render json: Business.all
  end

  def show
    @business = Business.find_by_id params[:id]
    render json: @business, include: [:locations]
  end

  # GET /businesses/:business_id/locations
  def show_locations
    @business = Business.find_by_id params[:business_id]
    render json: @business.locations, include: [:region]
  end

  # POST /businesses/:business_id/locations
  def create_location
    @business = Business.find_by_id params[:business_id]
    @location = @business.locations.create valid_location_params
    if @location.invalid?
      render json: @location.errors, status: 400
    else
      render json: @location
    end
  end

  # GET /businesses/:business_id/employees
  def show_employees
    @business = Business.find_by_id params[:business_id]
    if @business.present?
      render json: @business.employees
    else
      render json: null, status: 404
    end
  end

  private
    def valid_params
      params.require(:business).permit(
        :name,
        :address,
        :phone,
        :email,
        :website,
        :employee_business,
        :handle,
      )
    end
    def valid_location_params
      params.require(:location).permit(
        :name,
        :address,
        :city,
        :country,
        :province,
        :state,
        :postal,
        :lat,
        :long,
        :primary,
        :region_id,
      )
    end
end
