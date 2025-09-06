class Api::V1::Business::TechBlogsController < Api::V1::Business::BaseController
  before_action :business_authenticate

  def index
    render json: [ Serializer.call(TechBlogSerializer, @company.tech_blogs) ].flatten
  end

  def show
    render json: Serializer.call(TechBlogSerializer, current_tech_blog)
  end

  def create
    tech_blog = @company.tech_blogs.build(create_params)

    if tech_blog.invalid?
      render json: { errors: format_errors(tech_blog.errors), techBlog: Serializer.call(TechBlogSerializer, tech_blog) }, status: :bad_request
    else
      tech_blog.save!
      render json: { errors: {}, techBlog: Serializer.call(TechBlogSerializer, tech_blog) }
    end
  end

  def update
    permitted_params = update_params
      current_tech_blog.assign_attributes(permitted_params)

    if current_tech_blog.invalid?
      render json: { errors: format_errors(current_tech_blog.errors), techBlog: Serializer.call(TechBlogSerializer, current_tech_blog) }, status: :bad_request
    else
      current_tech_blog.save!
      render json: { errors: {}, techBlog: Serializer.call(TechBlogSerializer, current_tech_blog) }
    end
  end

  def destroy
    current_tech_blog.destroy!
    render json: Serializer.call(TechBlogSerializer, current_tech_blog)
  end

  private

  def create_params
    params.permit(:title, :url, :publishedAt).to_h.transform_keys(&:underscore).symbolize_keys
  end

  def update_params
    params.permit(:title, :url, :publishedAt).to_h.transform_keys(&:underscore).symbolize_keys
  end

  def current_tech_blog
    @current_tech_blog ||= @company.tech_blogs.find(params[:id])
  end
end
