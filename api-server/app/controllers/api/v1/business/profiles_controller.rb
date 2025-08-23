class Api::V1::Business::ProfilesController < Api::V1::Business::BaseController
  before_action :business_authenticate

  def show
    render json: Serializer.call(CompanySerializer, @company)
  end
end
