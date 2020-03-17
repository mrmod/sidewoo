class CreateEventTimes < ActiveRecord::Migration[6.0]
  def change
    create_table :event_times do |t|
      t.string :name
      t.text :description
      t.boolean :all_day
      t.timestamp :start_date
      t.timestamp :start_time
      t.timestamp :end_date
      t.timestamp :end_time
      t.references :business, null: false, foreign_key: true
    end
  end
end
