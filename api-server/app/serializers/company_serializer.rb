# frozen_string_literal: true

class CompanySerializer < ActiveModel::Serializer
  include JSONAPI::Serializer

  attributes :id, :name, :email, :logo, :address, :site_url, :employee_count, :industry

  def logo
    object.logo.url
  end

  def industry
    Serializer.call(IndustrySerializer, object.industry) if object.industry.present?
  end
end
