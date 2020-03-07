require 'test_helper'

class Api::V1::PostMembersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_post_members_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_post_members_create_url
    assert_response :success
  end

  test "should get delete" do
    get api_v1_post_members_delete_url
    assert_response :success
  end

end
