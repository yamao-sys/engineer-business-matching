class Api::V1::Business::CompaniesController < Api::V1::Business::BaseController
  def validate_sign_up
    permitted_params = validate_sign_up_params
    company = Company.new(name: permitted_params[:name], email: permitted_params[:email], password: permitted_params[:password])
    company.final_tax_return = permitted_params[:final_tax_return]

    if company.valid?
      render json: { errors: {} }
    else
      render json: { errors: format_errors(company.errors) }, status: :bad_request
    end
  end

  def sign_up
    permitted_params = sign_up_params
    company = Company.new(name: permitted_params[:name], email: permitted_params[:email], password: permitted_params[:password])
    company.final_tax_return = permitted_params[:final_tax_return]

    if company.invalid?
      render json: { errors: format_errors(company.errors) }, status: :bad_request
    else
      company.save!
      render json: { errors: {} }
    end
  end

  private

  def validate_sign_up_params
    params.permit(:name, :email, :password, :final_tax_return).to_h.symbolize_keys
  end

  def sign_up_params
    params.permit(:name, :email, :password, :final_tax_return).to_h.symbolize_keys
  end
end
