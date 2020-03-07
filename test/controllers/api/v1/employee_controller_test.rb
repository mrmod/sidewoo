require 'test_helper'

class Api::V1::EmployeeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_employee_index_url
    assert_response :success
  end

end
