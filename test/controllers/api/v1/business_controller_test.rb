require 'test_helper'

class Api::V1::BusinessControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_business_index_url
    assert_response :success
  end

end
