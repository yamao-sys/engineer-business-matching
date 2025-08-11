# frozen_string_literal: true

module ErrorFormattable
  extend ActiveSupport::Concern

  def format_errors(validation_errors)
    errors = {}

    validation_errors.each do |validation_error|
      errors[validation_error.attribute] = [] unless errors.key?(validation_error.attribute)

      errors[validation_error.attribute] << validation_error.full_message
    end

    errors
  end
end
