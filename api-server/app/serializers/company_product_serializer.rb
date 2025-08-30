# frozen_string_literal: true

class CompanyProductSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer

  attributes :name, :description, :url

  attribute :logoUrl do |object|
    object.logo&.url
  end
end
