# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :business do
        resources :companies do
          collection do
            post "validate-sign-up", to: "companies#validate_sign_up"
            post "sign-up", to: "companies#sign_up"
            post "sign-in", to: "companies#sign_in"
          end
        end
      end
    end
  end
end
