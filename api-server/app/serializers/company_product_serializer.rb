# frozen_string_literal: true

class CompanyProductSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer

  attributes :id, :name, :description, :url

  attribute :logoUrl do |object|
    object.logo&.url if object.persisted?
  end
end
