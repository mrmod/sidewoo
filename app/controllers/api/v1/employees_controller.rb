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
  end

  def delete
  end

  def update
  end
end
