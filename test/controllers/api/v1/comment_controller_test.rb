require 'test_helper'

class Api::V1::CommentControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_comment_index_url
    assert_response :success
  end

end
