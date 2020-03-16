class Api::V1::EventCommentsController < ApplicationController
    def index
        @event = Event.find_by_id params[:event_id]
        if !@event
            return 404
        end
        respond_to do |format|
            format.json { render json: @event.comments }
        end
    end
end
