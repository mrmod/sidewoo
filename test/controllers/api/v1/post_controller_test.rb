require 'test_helper'

class Api::V1::PostControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_post_index_url
    assert_response :success
  end

end
