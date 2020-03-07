class CreateBusinesses < ActiveRecord::Migration[6.0]
  def change
    create_table :businesses do |t|
      t.string :name
      t.text :address
      t.string :phone
      t.string :email
      t.text :website
      t.string :type
      t.boolean :employee_business
      t.string :handle

      t.timestamps
    end
  end
end
