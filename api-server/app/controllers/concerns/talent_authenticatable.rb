module TalentAuthenticatable
  extend ActiveSupport::Concern

  def talent_authenticate
    authorization_header = request.headers[:talent_authorization]
    if authorization_header.blank?
      render status: :unauthorized
    else
      token = authorization_header.split(" ")[1]
      secret_key = Rails.application.credentials.secret_key_base
      decoded_token = JWT.decode(token, secret_key, true, { algorithm: "HS256" })

      @engineer = Engineer.find(decoded_token[0]["engineer_id"])
    end
  end

  def talent_create_token(engineer_id)
    payload = { engineer_id:, exp: (Time.current + 1.days).to_i }
    secret_key = Rails.application.credentials.secret_key_base
    JWT.encode(payload, secret_key, "HS256")
  end
end
