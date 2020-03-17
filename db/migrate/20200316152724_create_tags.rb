class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.string :value
      t.text :url
      t.bigint :taggable_id
      t.string :taggable_type
    end
  end
end
