class Api::V1::Business::CompanyMembersController < Api::V1::Business::BaseController
  before_action :business_authenticate

  def index
    render json: [ Serializer.call(CompanyMemberSerializer, @company.company_members) ].flatten
  end

  def show
    render json: Serializer.call(CompanyMemberSerializer, current_company_member)
  end

  def create
    company_member = @company.company_members.build(create_params)

    if company_member.invalid?
      render json: { errors: format_errors(company_member.errors), companyMember: Serializer.call(CompanyMemberSerializer, company_member) }, status: :bad_request
    else
      company_member.save!
      render json: { errors: {}, companyMember: Serializer.call(CompanyMemberSerializer, company_member) }
    end
  end

  def update
    permitted_params = update_params
    current_company_member.assign_attributes(permitted_params)

    if current_company_member.invalid?
      render json: { errors: format_errors(current_company_member.errors), companyMember: Serializer.call(CompanyMemberSerializer, current_company_member) }, status: :bad_request
    else
      ActiveRecord::Base.transaction do
        if permitted_params[:icon].blank? && current_company_member.icon.present?
          current_company_member.icon_attacher.destroy
          current_company_member.icon = nil
        end
        current_company_member.save!
      end
      render json: { errors: {}, companyMember: Serializer.call(CompanyMemberSerializer, current_company_member) }
    end
  end

  def destroy
    current_company_member.destroy!
    render json: Serializer.call(CompanyMemberSerializer, current_company_member)
  end

  private

  def create_params
    params.permit(:name, :description, :position, :icon).to_h.transform_keys(&:underscore).symbolize_keys
  end

  def update_params
    params.permit(:name, :description, :position, :icon).to_h.transform_keys(&:underscore).symbolize_keys
  end

  def current_company_member
    @current_company_member ||= @company.company_members.find(params[:id])
  end
end
