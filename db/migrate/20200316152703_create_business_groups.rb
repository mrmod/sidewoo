class CreateBusinessGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :business_groups do |t|
      t.string :name
      t.text :description
      t.boolean :private, default: false
    end
  end
end
