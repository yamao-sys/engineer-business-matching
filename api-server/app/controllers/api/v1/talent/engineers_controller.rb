class Api::V1::Talent::EngineersController < Api::V1::Talent::BaseController
  def validate_sign_up
    permitted_params = validate_sign_up_params
    engineer = Engineer.new(
      first_name: permitted_params[:first_name],
      last_name: permitted_params[:last_name],
      email: permitted_params[:email],
      password: permitted_params[:password],
      birthday: permitted_params[:birthday]
    )
    engineer.front_identification = permitted_params[:front_identification]
    engineer.back_identification = permitted_params[:back_identification]

    if engineer.valid?
      render json: { errors: {} }
    else
      render json: { errors: format_errors(engineer.errors) }, status: :bad_request
    end
  end

  def sign_up
    permitted_params = sign_up_params
    engineer = Engineer.new(
      first_name: permitted_params[:first_name],
      last_name: permitted_params[:last_name],
      email: permitted_params[:email],
      password: permitted_params[:password],
      birthday: permitted_params[:birthday]
    )
    engineer.front_identification = permitted_params[:front_identification]
    engineer.back_identification = permitted_params[:back_identification]

    if engineer.invalid?
      render json: { errors: format_errors(engineer.errors) }, status: :bad_request
    else
      engineer.save!
      render json: { errors: {} }
    end
  end

  def sign_in
    permitted_params = sign_in_params
    engineer = Engineer.find_by(email: permitted_params[:email])

    if engineer.blank? || !engineer.authenticate(permitted_params[:password])
      render json: { token: "", error: "メールアドレスまたはパスワードに該当するユーザが見つかりません。" }, status: :bad_request
    else
      token = talent_create_token(engineer.id)
      render json: { token:, error: "" }
    end
  end

  private

  def validate_sign_up_params
    params.permit(:firstName, :lastName, :email, :password, :birthday, :frontIdentification, :backIdentification).to_h.transform_keys(&:underscore).symbolize_keys
  end

  def sign_up_params
    params.permit(:firstName, :lastName, :email, :password, :birthday, :frontIdentification, :backIdentification).to_h.transform_keys(&:underscore).symbolize_keys
  end

  def sign_in_params
    params.permit(:email, :password).to_h.transform_keys(&:underscore).symbolize_keys
  end
end
