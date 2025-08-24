module BusinessAuthenticatable
  extend ActiveSupport::Concern

  def business_authenticate
    authorization_header = request.headers["Business-Authorization"]
    if authorization_header.blank?
      render status: :unauthorized
    else
      token = authorization_header.split(" ")[1]
      secret_key = Rails.application.credentials.secret_key_base
      decoded_token = JWT.decode(token, secret_key, true, { algorithm: "HS256" })

      @company = Company.find(decoded_token[0]["company_id"])
    end
  end

  def business_create_token(company_id)
    payload = { company_id:, exp: (Time.current + 1.days).to_i }
    secret_key = Rails.application.credentials.secret_key_base
    JWT.encode(payload, secret_key, "HS256")
  end
end
