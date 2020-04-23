class AddLocationToEmployee < ActiveRecord::Migration[6.0]
  def change
    add_reference :employees, :location, null: false, foreign_key: true
  end
end
