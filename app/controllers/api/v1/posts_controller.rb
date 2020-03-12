class Api::V1::PostsController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Post.all }
    end
  end
  def show
    @post = Post.find_by_id params[:id]
    respond_to do |format|
      format.json { render json: @post }
    end
  end

  def create
    @post = Post.create valid_params
    respond_to do |format|
      format.json {render json: @post}
    end
  end

  def destroy
    begin
      Post.destroy params[:id]
      respond_to do |format|
        format.json { render json: {id: params[:id]} }
      end
    rescue ActiveRecord::RecordNotFound
      respond_to do |format|
        format.json { render json: {}, status: 404 }
      end
    end
  end

  def update
    begin
      @post = Post.update params[:id], valid_params
      respond_to do |format|
        format.json { render json: @post }
      end
    rescue ActiveModel::ForbiddenAttributesError => e
      puts "Error: #{e} #{params}"
      render json: {'notFound': params[:id], status: 404 }
    end
  end

  private
    def valid_params
      params.require(:post).permit(
        :employee_id,
        :private,
        :topic,
        :text,
      )
    end
end
