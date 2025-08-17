# frozen_string_literal: true

module ErrorFormattable
  extend ActiveSupport::Concern

  def format_errors(validation_errors)
    errors = {}

    validation_errors.each do |validation_error|
      attr_name = validation_error.attribute.to_s.camelize(:lower).to_sym
      errors[attr_name] = [] unless errors.key?(attr_name)

      errors[attr_name] << validation_error.full_message
    end

    errors
  end
end
