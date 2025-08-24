# frozen_string_literal: true

RSpec.shared_context "with business auth" do
  let(:company) { create(:company) }
  let(:token) { Api::V1::Business::BaseController.new.business_create_token(company.id) }
  let!(:business_auth_header) { { "Business-Authorization" => "Bearer #{token}" } }
end

RSpec.shared_context "with talent auth" do
  let(:engineer) { create(:engineer) }
  let(:token) { Api::V1::Talent::BaseController.new.talent_create_token(engineer.id) }
  let!(:talent_auth_header) { { "Talent-Authorization" => "Bearer #{token}" } }
end
