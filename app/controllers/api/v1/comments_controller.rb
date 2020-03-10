class Api::V1::CommentsController < ApplicationController
  # TODO: Not production safe
  skip_before_action :verify_authenticity_token
  def index
    respond_to do |format|
      format.json { render json: Comment.all }
    end
  end

  def create
    @comment = Comment.create valid_params
    if @comment.invalid?
      respond_to do |format|
        format.json { render json: @comment.errors, status: 400}
      end
    else
      respond_to do |format|
        format.json { render json: @comment }
      end
    end
  end

  def destroy
    begin
      Comment.destroy params[:id]
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
  end

  private
    def valid_params
      params.require(:comment).permit(
        :post_id,
        :comment_id,
        :employee_id,
        :text
      )
    end
end
