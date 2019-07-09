class User < ApplicationRecord
    has_many :jobs
    validates :username, presence: true
    validates :username, uniqueness: true
    validates :username, length: {minimum: 2}
end
