class CreateEventComments < ActiveRecord::Migration[6.0]
  def change
    create_table :event_comments do |t|
      t.text :text
      t.references :event, null: false, foreign_key: true
      t.bigint :event_comment_id
      t.references :employee, null: false, foreign_key: true

      t.timestamps
    end
  end
end
