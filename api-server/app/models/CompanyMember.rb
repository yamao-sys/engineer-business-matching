# frozen_string_literal: true

class CompanyMember < ApplicationRecord
  include FileUploadable

  belongs_to :company

  has_attached_file :icon

  validates :name, presence: true
  validates :position, presence: true
  validates :description, presence: true
end
