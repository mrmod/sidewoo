class CreateEventInvitation < ActiveRecord::Migration[6.0]
  def change
    create_table :event_invitations do |t|
      t.text :name
      t.bigint :host_business_id
      t.bigint :guest_business_id
      t.references :event, null: false, foreign_key: true
      t.string :redemption_code
    end
  end
end
