class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :topic
      t.text :text
      t.boolean :private, default: false
      t.references :employee, null: false, foreign_key: true

      t.timestamps
    end
  end
end
