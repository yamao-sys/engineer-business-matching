class Api::V1::Business::ProfilesController < Api::V1::Business::BaseController
  before_action :business_authenticate

  def show
    render json: Serializer.call(CompanySerializer, @company)
  end

  def update
    permitted_params = update_params
    @company.assign_attributes(permitted_params)

    if @company.invalid?
      render json: { errors: format_errors(@company.errors), company: Serializer.call(CompanySerializer, @company) }, status: :bad_request
    else
      ActiveRecord::Base.transaction do
        if permitted_params[:logo].blank? && @company.logo.present?
          @company.logo_attacher.destroy
          @company.logo = nil
        end
        @company.save!
      end
      render json: { errors: {}, company: Serializer.call(CompanySerializer, @company) }
    end
  end

  private

  def update_params
    params.permit(:name, :logo, :email, :address, :siteUrl, :employeeCount, :industryId).to_h.transform_keys(&:underscore).symbolize_keys
  end
end
