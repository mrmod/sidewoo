class Api::V1::RegionsController < ApplicationController
    def create
        @region = Region.create valid_params
        File.open(File.join(Rails.root, 'sample_regions.json'), 'a+') do |samples|
            samples.write JSON.dump(valid_params['points']) + ","
        end
        if @region.invalid?
            render json: @region.errors, status: 400
        else
            render json: @region
        end
    end

    def show
        @region = Region.find_by_id params[:id]
        if @region.present?
            render json: @region
        else
            render json: null, status: 404
        end
    end

    private
        def valid_params
            params.require(:region).permit(
                :name,
                :points
            )
        end
end