class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :text
      t.string :image_url
      t.string :community_id, null: false

      t.timestamps
    end
  end
end