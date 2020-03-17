class CreateEmployees < ActiveRecord::Migration[6.0]
  def change
    create_table :employees do |t|
      t.string :name
      t.references :business, null: false, foreign_key: true
      t.integer :role, default: 0
      t.string :handle
    end
  end
end
