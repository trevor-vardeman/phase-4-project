class CreatePostVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :post_votes do |t|

      t.timestamps
    end
  end
end
