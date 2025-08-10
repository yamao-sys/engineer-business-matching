class Api::V1::Business::CompaniesController < Api::V1::Business::BaseController
  def validate_sign_up
    render json: { message: "Hello, world!" }
  end

  def sign_up
    render json: { message: "Hello, world!" }
  end
end
