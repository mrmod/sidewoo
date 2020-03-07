require 'test_helper'

class Api::V1::PostMemberControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_post_member_index_url
    assert_response :success
  end

end
