class Engineer < ApplicationRecord
  include FileUploadable

  has_attached_file :front_identification
  has_attached_file :back_identification

  has_secure_password

  validates :firstName, presence: true, length: { maximum: 50 }
  validates :lastName, presence: true, length: { maximum: 50 }
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, maximum: 24 }
  validates :birthday, presence: true
end
