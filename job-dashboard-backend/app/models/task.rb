class Task < ApplicationRecord
  belongs_to :user
  belongs_to :job
  validates :activity, presence: true
  validates :due_by, presence: true
end
