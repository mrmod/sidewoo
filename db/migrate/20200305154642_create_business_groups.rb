class CreateBusinessGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :business_groups do |t|
      t.string :name
      t.text :description
      t.boolean :private, default: false

      t.timestamps
    end
  end
end
