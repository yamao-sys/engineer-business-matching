# frozen_string_literal: true

class CompanyStorySerializer < ActiveModel::Serializer
  include JSONAPI::Serializer

  attributes :mission, :vision
end
