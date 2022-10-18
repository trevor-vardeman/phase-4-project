class CreateCommentVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :comment_votes do |t|
      t.integer :post_id, null: false
      t.integer :user_id, null: false
      t.integer :points, null: false

      t.timestamps
    end
  end
end
