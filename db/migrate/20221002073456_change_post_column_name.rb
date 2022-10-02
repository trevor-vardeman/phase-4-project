class ChangePostColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :posts, :link, :image_url
  end
end