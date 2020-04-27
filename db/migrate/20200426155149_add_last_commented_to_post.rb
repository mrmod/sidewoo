class AddLastCommentedToPost < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :last_commented, :datetime, default: -> { "CURRENT_TIMESTAMP" }
  end
end
