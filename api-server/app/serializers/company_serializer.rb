# frozen_string_literal: true

class CompanySerializer < ActiveModel::Serializer
  include JSONAPI::Serializer

  attributes :id, :name, :email, :address, :industry
  attribute :siteUrl, &:site_url
  attribute :employeeCount, &:employee_count

  attribute :logoUrl do |object|
    object.logo&.url
  end

  attribute :industry do |object|
    Serializer.call(IndustrySerializer, object.industry) if object.industry.present?
  end
end
