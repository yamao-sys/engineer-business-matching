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

  def sign_in
    permitted_params = sign_in_params
    company = Company.find_by(email: permitted_params[:email])

    if company.blank? || !company.authenticate(permitted_params[:password])
      render json: { token: "", error: "メールアドレスまたはパスワードに該当するユーザが見つかりません。" }, status: :bad_request
    else
      token = business_create_token(company.id)
      render json: { token:, error: "" }
    end
  end

  private

  def validate_sign_up_params
    params.permit(:name, :email, :password, :finalTaxReturn).to_h.transform_keys(&:underscore).symbolize_keys
  end

  def sign_up_params
    params.permit(:name, :email, :password, :finalTaxReturn).to_h.transform_keys(&:underscore).symbolize_keys
  end

  def sign_in_params
    params.permit(:email, :password).to_h.transform_keys(&:underscore).symbolize_keys
  end
end
