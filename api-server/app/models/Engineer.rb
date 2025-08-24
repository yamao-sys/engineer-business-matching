class Engineer < ApplicationRecord
  include FileUploadable

  has_attached_file :front_identification
  has_attached_file :back_identification

  has_secure_password

  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, maximum: 24 }, if: -> { new_record? }
  validates :birthday, presence: true
  validates :tel, allow_blank: true, format: { with: /\A0\d+\z/, message: "は0から始まる数字のみで入力してください。" }, length: { maximum: 11 }

  alias_attribute :firstName, :first_name
  alias_attribute :lastName, :last_name
  alias_attribute :currentEmployer, :current_employer
end
