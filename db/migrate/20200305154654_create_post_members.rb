class CreatePostMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :post_members do |t|
      t.references :post, null: false, foreign_key: true
      t.references :employee, null: false, foreign_key: true
      t.integer :role, default: 0

      t.timestamps
    end
  end
end
