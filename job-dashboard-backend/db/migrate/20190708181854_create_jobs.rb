class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.string :company
      t.string :title
      t.string :status
      t.text :description
      t.date :applied_date
      t.datetime :interview_date
      t.date :deadline
      t.date :date_posted
      t.string :source
      t.string :url
      
      t.timestamps
    end
  end
end
