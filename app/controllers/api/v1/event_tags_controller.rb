class Api::V1::EventTagsController < ApplicationController
    def create
        uploaded_file = params[:file]

        @event = Event.find_by_id params[:event_id]
        @tags = @event.tag.create! valid_params

        render json: {event: @event, tags: @tags}
    end

    def index
        @event = Event.find_by_id params[:event_id]
        render json: @event.tags
    end

    private
        def valid_params
            params.require(:tag).permit(
                :name,
                :value,
                :url,
                :taggable_id,
                :taggable_type,
            )
        end
end
