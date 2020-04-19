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
  end

  private
    def valid_params
      params.require(:employee).permit(
        :name,
        :email,
        :business_id,
        :handle,
        :role,
      )
    end
end
