require 'test_helper'

class Api::V1::BusinessGroupMemberControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_business_group_member_index_url
    assert_response :success
  end

end
