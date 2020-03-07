require 'test_helper'

class Api::V1::EventControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_event_index_url
    assert_response :success
  end

end
