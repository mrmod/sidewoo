class CreateSocials < ActiveRecord::Migration[6.0]
  def change
    create_table :socials do |t|
      t.string :name
      t.text :url
      t.string :handle
      t.references :business, null: false, foreign_key: true
    end
  end
end
