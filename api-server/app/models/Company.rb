class Company < ApplicationRecord
  include FileUploadable

  has_attached_file :final_tax_return

  has_secure_password

  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, maximum: 24 }
end
