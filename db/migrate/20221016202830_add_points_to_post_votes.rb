class AddPointsToPostVotes < ActiveRecord::Migration[6.1]
  def change
    add_column :post_votes, :points, :integer, null: false
  end
end