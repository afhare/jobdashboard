class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :activity
      t.references :user, foreign_key: true
      t.references :job, foreign_key: true
      t.date :due_by

      t.timestamps
    end
  end
end
