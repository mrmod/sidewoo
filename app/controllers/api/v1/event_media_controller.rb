class Api::V1::EventMediaController < ApplicationController
    def create
        uploaded_file = params[:file]

        s3_object = Medium.s3_create uploaded_file
        @event = Event.find_by_id params[:event_id]
        @media = @event.media.create! name: s3_object[:name], url: s3_object[:url]

        render json: {event: @event, media: @media}
    end

    def index
        @event = Event.find_by_id params[:event_id]
        render json: @event.media
    end
end
