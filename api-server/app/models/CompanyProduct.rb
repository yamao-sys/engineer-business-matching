# frozen_string_literal: true

class CompanyProduct < ApplicationRecord
  include FileUploadable

  belongs_to :company

  has_attached_file :logo

  validates :name, presence: true
  validates :description, presence: true
  validates :url, presence: true
end
