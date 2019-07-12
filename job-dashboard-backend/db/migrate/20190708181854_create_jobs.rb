class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.string :company
      t.string :title
      t.string :status
      t.text :description
      t.text :listing_notes
      t.string :source
      t.string :url
      t.boolean :dream_job
      t.timestamps
    end
  end
end
