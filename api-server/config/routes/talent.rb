# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :talent do
        resources :engineers do
          collection do
            post "validate-sign-up", to: "engineers#validate_sign_up"
            post "sign-up", to: "engineers#sign_up"
          end
        end
      end
    end
  end
end
