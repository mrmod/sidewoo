class AddModifiedAtToComment < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :modified_at, :datetime, default: -> { "CURRENT_TIMESTAMP" }
  end
end
