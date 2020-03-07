class CreateMedia < ActiveRecord::Migration[6.0]
  def change
    create_table :media do |t|
      t.text :name
      t.text :url
      t.bigint :mediumable_id
      t.string :mediumable_type

      t.timestamps
    end
  end
end
