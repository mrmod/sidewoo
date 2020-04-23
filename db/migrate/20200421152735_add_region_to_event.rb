class AddRegionToEvent < ActiveRecord::Migration[6.0]
  def change
    add_reference :events, :region, null: false, foreign_key: true
  end
end
