# frozen_string_literal: true

class TechBlog < ApplicationRecord
  belongs_to :company

  validates :url, presence: true
  validates :title, presence: true
  validates :published_at, presence: true
end
