class Api::V1::MediaController < ApplicationController
  def show
    @media = Medium.find_by_id params[:id]
    render json: @media, status: @media.present? ? 200 : 404
  end

  def destroy
    begin
      Medium.destroy params[:id]
      render json: nil
    rescue ActiveRecord::RecordNotFound
      render json: nill, status: 404
    end
  end
end
