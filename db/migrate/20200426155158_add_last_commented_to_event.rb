class AddLastCommentedToEvent < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :last_commented, :datetime, default: -> { "CURRENT_TIMESTAMP" }
  end
end
