class Api::V1::RegionsController < ApplicationController
    def index
        if params[:name]
            render json: Region.find_by_name(params[:name])
        elsif params[:default]
            render json: Region.find_by_name(Region::NEW_BUSINESS_REGION)
        else
            render json: Region.all
        end
    end

    def create
        @region = Region.create valid_params
        # Save regions to create fake regions
        # File.open(File.join(Rails.root, 'sample_regions.json'), 'a+') do |samples|
        #     samples.write JSON.dump(valid_params['points']) + ","
        # end
        if @region.invalid?
            render json: @region.errors, status: 400
        else
            render json: @region
        end
    end

    def show
        @region = Region.find params[:id]
        if @region.present?
            render json: @region
        else
            render json: nil, status: 404
        end
    end

    # GET /regions/:region_id/posts
    def show_posts
        @region = Region.find params[:region_id]
        if @region.present?
            render json: @region.posts
        else
            render json: nil, status: 404
        end
    end

    # GET /regions/:region_id/events
    def show_events
        @region = Region.find params[:region_id]
        if @region.present?
            render json: @region.events
        else
            render json: nil, status: 404
        end
    end

    # GET /regions/:region_id/businesses
    def show_businesses
        @businesses = Location.regional_businesses params[:region_id]
        render json: @businesses
    end

    private
        def valid_params
            params.require(:region).permit(
                :name,
                :points,
                :center_lat,
                :center_lng,
            )
        end
end