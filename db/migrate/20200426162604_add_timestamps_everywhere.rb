class AddTimestampsEverywhere < ActiveRecord::Migration[6.0]
  def change
    change_table :posts do |t|
      t.timestamps
    end
    change_table :events do |t|
      t.timestamps
    end
    change_table :comments do |t|
      t.timestamps
    end
    change_table :businesses do |t|
      t.timestamps
    end
    change_table :employees do |t|
      t.timestamps
    end
    change_table :locations do |t|
      t.timestamps
    end
    change_table :event_invitations do |t|
      t.timestamps
    end
    change_table :business_groups do |t|
      t.timestamps
    end
    change_table :business_group_members do |t|
      t.timestamps
    end
    change_table :post_members do |t|
      t.timestamps
    end
    change_table :socials do |t|
      t.timestamps
    end
    change_table :media do |t|
      t.timestamps
    end
    change_table :tags do |t|
      t.timestamps
    end
  end
end
