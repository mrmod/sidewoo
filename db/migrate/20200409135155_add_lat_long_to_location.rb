class AddLatLongToLocation < ActiveRecord::Migration[6.0]
  def change
    add_column :locations, :lat, :decimal
    add_column :locations, :long, :decimal
  end
end
