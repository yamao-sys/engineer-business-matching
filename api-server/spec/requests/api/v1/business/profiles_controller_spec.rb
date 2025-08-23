# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Business::ProfilesController, type: :request do
  describe "GET #show" do
    include_context "with files"
    include_context "with business auth"

    let(:industry) { Industry.find_by(name: "コミュニーケーション系") }
    let!(:company) { create(:company, email: "test@example.com", password: "password", industry:, logo: sample_jpg_file) }

    subject { get api_v1_business_profile_url, headers: business_auth_header }

    it "returns 200" do
      aggregate_failures do
        expect(subject).to eq(200)

        res_body = JSON.parse(response.body).deep_symbolize_keys
        expect(res_body[:id]).to eq(company.id)
        expect(res_body[:name]).to eq(company.name)
        expect(res_body[:email]).to eq(company.email)
        expect(res_body[:logo]).to be_present
        expect(res_body[:address]).to eq(company.address)
        expect(res_body[:site_url]).to eq(company.site_url)
        expect(res_body[:employee_count]).to eq(company.employee_count)
        expect(res_body[:industry][:id]).to eq(industry.id)
        expect(res_body[:industry][:name]).to eq(industry.name)
      end
    end
  end
end
