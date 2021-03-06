class Api::V1::EventsController < ApplicationController
  def index
    render json: Event.all, include: :invitations
  end

  def show
    @event = Event.find_by_id params[:id]
    if @event.present?
      render json: @event, include: :invitations
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
      render json: {id: params[:id]}
    rescue ActiveRecord::RecordNotFound
       render json: {}, status: 404
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
        :region_id,
      )
    end
end
