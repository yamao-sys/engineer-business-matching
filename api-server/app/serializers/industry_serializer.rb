# frozen_string_literal: true

class IndustrySerializer < ActiveModel::Serializer
  include JSONAPI::Serializer

  attributes :id, :name
end
