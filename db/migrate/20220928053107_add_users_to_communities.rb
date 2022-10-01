class AddUsersToCommunities < ActiveRecord::Migration[6.1]
  def change
    add_column :communities, :user_id, :integer, null: false
  end
end