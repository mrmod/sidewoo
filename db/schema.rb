# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_05_154711) do

  create_table "business_group_members", force: :cascade do |t|
    t.integer "business_group_id", null: false
    t.integer "business_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["business_group_id"], name: "index_business_group_members_on_business_group_id"
    t.index ["business_id"], name: "index_business_group_members_on_business_id"
  end

  create_table "business_groups", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.boolean "private", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "businesses", force: :cascade do |t|
    t.string "name"
    t.text "address"
    t.string "phone"
    t.string "email"
    t.text "website"
    t.string "type"
    t.boolean "employee_business"
    t.string "handle"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "comments", force: :cascade do |t|
    t.text "text"
    t.integer "post_id", null: false
    t.bigint "comment_id"
    t.integer "employee_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["employee_id"], name: "index_comments_on_employee_id"
    t.index ["post_id"], name: "index_comments_on_post_id"
  end

  create_table "employees", force: :cascade do |t|
    t.string "name"
    t.integer "business_id", null: false
    t.integer "role", default: 0
    t.string "handle"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["business_id"], name: "index_employees_on_business_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.text "theme"
    t.text "description"
    t.datetime "start_time"
    t.datetime "end_time"
    t.bigint "parent_id"
    t.integer "business_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["business_id"], name: "index_events_on_business_id"
  end

  create_table "locations", force: :cascade do |t|
    t.text "address"
    t.text "city"
    t.string "country"
    t.string "province"
    t.string "state"
    t.string "postal"
    t.bigint "locatable_id"
    t.string "locatable_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "media", force: :cascade do |t|
    t.text "url"
    t.bigint "mediumable_id"
    t.string "mediumable_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "post_members", force: :cascade do |t|
    t.integer "post_id", null: false
    t.integer "employee_id", null: false
    t.integer "role", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["employee_id"], name: "index_post_members_on_employee_id"
    t.index ["post_id"], name: "index_post_members_on_post_id"
  end

  create_table "posts", force: :cascade do |t|
    t.text "topic"
    t.text "text"
    t.boolean "private", default: false
    t.integer "employee_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["employee_id"], name: "index_posts_on_employee_id"
  end

  create_table "socials", force: :cascade do |t|
    t.string "name"
    t.text "url"
    t.string "handle"
    t.integer "business_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["business_id"], name: "index_socials_on_business_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.string "value"
    t.text "url"
    t.bigint "taggable_id"
    t.string "taggable_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "business_group_members", "business_groups"
  add_foreign_key "business_group_members", "businesses"
  add_foreign_key "comments", "employees"
  add_foreign_key "comments", "posts"
  add_foreign_key "employees", "businesses"
  add_foreign_key "events", "businesses"
  add_foreign_key "post_members", "employees"
  add_foreign_key "post_members", "posts"
  add_foreign_key "posts", "employees"
  add_foreign_key "socials", "businesses"
end
