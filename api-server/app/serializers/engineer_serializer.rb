# frozen_string_literal: true

class EngineerSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer

  attributes :id, :firstName, :lastName, :address, :currentEmployer, :tel

  attribute :birthday do |object|
    object.birthday.strftime("%Y-%m-%d")
  end
end
