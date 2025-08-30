# frozen_string_literal: true

class CompanyStory < ApplicationRecord
  belongs_to :company

  validates :mission, presence: true
  validates :vision, presence: true
end
