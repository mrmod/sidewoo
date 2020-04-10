class AddPrimaryToLocation < ActiveRecord::Migration[6.0]
  def change
    add_column :locations, :primary, :boolean, default: false
    Location.all.each do |location|
      location.update_attributes! primary: false
    end
  end
end
