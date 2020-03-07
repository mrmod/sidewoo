require 'test_helper'

class Api::V1::SocialControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_social_index_url
    assert_response :success
  end

end
