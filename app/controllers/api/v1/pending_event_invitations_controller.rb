class Api::V1::PendingEventInvitationsController < ApplicationController
    def show
        @event = Event.find_by_id params[:event_id]
        
        if @event.present?
            render json: @event.invitations
        else
            render json: null, status: 404
        end
    end
end
