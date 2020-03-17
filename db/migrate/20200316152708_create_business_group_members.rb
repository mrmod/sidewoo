class CreateBusinessGroupMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :business_group_members do |t|
      t.references :business_group, null: false, foreign_key: true
      t.references :business, null: false, foreign_key: true
    end
  end
end
