class AddGooglePlacesToLocation < ActiveRecord::Migration[6.0]
  def change
    add_column :locations, :places_id, :string
    add_column :locations, :places_neighborhood, :string
  end
end
