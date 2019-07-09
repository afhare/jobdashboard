class AddDreamJobToJobs < ActiveRecord::Migration[5.2]
  def change
    add_column :jobs, :dream_job, :boolean
  end
end
