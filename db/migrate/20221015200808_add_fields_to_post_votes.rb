class AddFieldsToPostVotes < ActiveRecord::Migration[6.1]
  def change
    add_column :post_votes, :post_id, :integer, null: false
    add_column :post_votes, :user_id, :integer, null: false
  end
end
