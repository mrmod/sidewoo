class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.text :text
      t.bigint :comment_id
      t.references :employee, null: false, foreign_key: true
      t.string :commentable_type
      t.bigint :commentable_id
    end
  end
end
