class User < ApplicationRecord
    has_many :jobs
    has_many :tasks
    validates :username, presence: true
    validates :username, uniqueness: true
    validates :username, length: {minimum: 2}
end
