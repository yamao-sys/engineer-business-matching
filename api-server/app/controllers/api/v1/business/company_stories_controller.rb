class Api::V1::Business::CompanyStoriesController < Api::V1::Business::BaseController
  before_action :business_authenticate

  def show
    render json: Serializer.call(CompanyStorySerializer, current_company_story)
  end

  def update
    permitted_params = update_params
    current_company_story.assign_attributes(permitted_params)

    if current_company_story.invalid?
      render json: { errors: format_errors(current_company_story.errors), companyStory: Serializer.call(CompanyStorySerializer, current_company_story) }, status: :bad_request
    else
      current_company_story.save!
      render json: { errors: {}, companyStory: Serializer.call(CompanyStorySerializer, current_company_story) }
    end
  end

  private

  def update_params
    params.permit(:mission, :vision).to_h.transform_keys(&:underscore).symbolize_keys
  end

  def current_company_story
    @current_company_story ||= @company.company_story.presence || @company.build_company_story
  end
end
