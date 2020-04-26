class Api::V1::EmployeesController < ApplicationController
  def index
    render json: Employee.all
  end

  def show
    @employee = Employee.find_by_id params[:id]
    if @employee.present?
      render json: @employee
    else
      render json: null, status: 404
    end
  end

  def create
    @employee = Employee.create valid_params

    if @employee.invalid?
      render json: @employee.errors, status: 400
    else
      render json: @mployee
    end
  end

  def delete
  end

  def update
    @employee = Employee.find params[:id]
    unless @employee.present?
      render json: nil, status: 404
      return
    end
    if @employee.update valid_params
      render json: @employee
    else
      render json: @employee.errors, status: 400
    end
  end

  private
    def valid_params
      params.require(:employee).permit(
        :name,
        :email,
        :business_id,
        :location_id,
        :handle,
        :role,
      )
    end
end
