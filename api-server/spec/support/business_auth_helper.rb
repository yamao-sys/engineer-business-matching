# frozen_string_literal: true

RSpec.shared_context "with business auth" do
  let(:company) { create(:company) }
  let(:token) { Api::V1::Business::BaseController.new.business_create_token(company.id) }
  let!(:business_auth_header) { { "business_authorization" => "Bearer #{token}" } }
end
