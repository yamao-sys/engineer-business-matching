# frozen_string_literal: true

class TechBlogSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer

  set_key_transform :camel_lower

  attributes :id, :title, :url, :published_at
end
