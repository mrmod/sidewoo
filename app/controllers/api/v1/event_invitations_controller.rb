class Api::V1::EventInvitationsController < ApplicationController
    def create
        @invitation = EventInvitation.create valid_params
        if @invitation.invalid?
            render json: @invitation.errors, status: 400
        else
            render json: @invitation
        end
    end

    def destroy
        begin
            EventInvitation.destroy params[:id]
            render json: nil
        rescue ActiveRecord::RecordNotFound
            render json: {id: params[:id]}, status: 404
        end
    end

    private
        def valid_params
            params.require(:eventInvitation).permit(
                :host_business_id,
                :guest_business_id,
                :event_id,
                :name,
            )
        end
end