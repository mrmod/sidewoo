class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.text :name
      t.text :address
      t.text :city
      t.string :country
      t.string :province
      t.string :state
      t.string :postal
      t.bigint :locatable_id
      t.string :locatable_type

      t.timestamps
    end
  end
end
