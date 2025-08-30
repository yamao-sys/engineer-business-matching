class Api::V1::Business::CompanyProductsController < Api::V1::Business::BaseController
  before_action :business_authenticate

  def show
    render json: Serializer.call(CompanyProductSerializer, current_company_product)
  end

  def update
    permitted_params = update_params
    current_company_product.assign_attributes(permitted_params)

    if current_company_product.invalid?
      render json: { errors: format_errors(current_company_product.errors), companyProduct: Serializer.call(CompanyProductSerializer, current_company_product) }, status: :bad_request
    else
      ActiveRecord::Base.transaction do
        if permitted_params[:logo].blank? && current_company_product.logo.present?
          current_company_product.logo_attacher.destroy
          current_company_product.logo = nil
        end
        current_company_product.save!
      end
      render json: { errors: {}, companyProduct: Serializer.call(CompanyProductSerializer, current_company_product) }
    end
  end

  private

  def update_params
    params.permit(:name, :description, :url, :logo).to_h.transform_keys(&:underscore).symbolize_keys
  end

  def current_company_product
    @current_company_product ||= @company.company_product.presence || @company.build_company_product
  end
end
