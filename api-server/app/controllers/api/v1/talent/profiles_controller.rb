class Api::V1::Talent::ProfilesController < Api::V1::Talent::BaseController
  before_action :talent_authenticate

  def show
    render json: Serializer.call(EngineerSerializer, @engineer)
  end

  def update
    permitted_params = update_params
    @engineer.assign_attributes(permitted_params)

    if @engineer.invalid?
      render json: { errors: format_errors(@engineer.errors), engineer: Serializer.call(EngineerSerializer, @engineer) }, status: :bad_request
    else
      @engineer.save!
      render json: { errors: {}, engineer: Serializer.call(EngineerSerializer, @engineer) }
    end
  end

  private

  def update_params
    params.permit(:firstName, :lastName, :birthday, :address, :currentEmployer, :tel).to_h.transform_keys(&:underscore).symbolize_keys
  end
end
