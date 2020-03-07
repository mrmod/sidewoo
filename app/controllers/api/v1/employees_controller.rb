class Api::V1::EmployeesController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Employee.all }
    end
  end

  def create
  end

  def delete
  end

  def update
  end
end
