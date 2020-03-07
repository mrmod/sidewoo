class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :name
      t.text :theme
      t.text :description
      t.timestamp :start_time
      t.timestamp :end_time
      t.bigint :parent_id
      t.references :business, null: false, foreign_key: true

      t.timestamps
    end
  end
end
