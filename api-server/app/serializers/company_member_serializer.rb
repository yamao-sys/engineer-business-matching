# frozen_string_literal: true

class CompanyMemberSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer

  attributes :id, :name, :description, :position

  attribute :iconUrl do |object|
    object.icon&.url if object.persisted?
  end
end
