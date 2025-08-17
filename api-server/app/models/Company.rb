class Company < ApplicationRecord
  include FileUploadable

  belongs_to :industry, optional: true

  has_attached_file :final_tax_return
  has_attached_file :logo

  has_secure_password

  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, maximum: 24 }
end
