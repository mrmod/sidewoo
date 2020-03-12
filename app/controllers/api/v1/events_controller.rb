class Api::V1::EventsController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Event.all }
    end
  end

  def show
    @event = Event.find_by_id params[:id]
    if @event.present?
      respond_to do |format|
        format.json { render json: @event}
      end
    else
      render json: {'notFound': params[:id]}, status: 404
    end
  end

  def create
    @event = Event.create valid_params
    if @event.invalid?
      respond_to do |format|
        format.json { render json: @event.errors, status: 400}
      end
    else
      respond_to do |format|
        format.json { render json: @event }
      end
    end
  end

  def update
    begin
      @event = Event.update params[:id], valid_params
      respond_to do |format|
        format.json { render json: @event }
      end
    rescue ActiveModel::ForbiddenAttributesError => e
      puts "Error: #{e} #{params}"
      
      render json: {'notFound': params[:id], status: 404 }
    end
  end

  def destroy
    begin
      Event.destroy params[:id]
      respond_to do |format|
        format.json { render json: {id: params[:id]} }
      end
    rescue ActiveRecord::RecordNotFound
      respond_to do |format|
        format.json { render json: {}, status: 404 }
      end
    end
  end

  private
    def valid_params
      params.require(:event).permit(
        :id,
        :name,
        :theme,
        :description,
        :start_time,
        :end_time,
        :parent_id,
        :business_id,
      )
    end
end
