class AddGeoToRegion < ActiveRecord::Migration[6.0]
  def change
    add_column :regions, :center_lat, :decimal
    add_column :regions, :center_lng, :decimal
  end
end
