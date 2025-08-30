# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Business::CompanyStoriesController, type: :request do
  describe "GET #show" do
    include_context "with business auth"

    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    subject { get api_v1_business_company_story_url, headers: business_auth_header }

    context "when the company has a company story" do
      let!(:company_story) { create(:company_story, company:) }

      it "returns 200" do
      aggregate_failures do
        expect(subject).to eq(200)

        res_body = JSON.parse(response.body).deep_symbolize_keys
        expect(res_body[:mission]).to eq(company_story.mission)
        expect(res_body[:vision]).to eq(company_story.vision)
        end
      end
    end

    context "when the company does not have a company story" do
      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:mission]).to be_nil
          expect(res_body[:vision]).to be_nil
        end
      end
    end
  end

  describe "PUT #update" do
    include_context "with business auth"

    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    subject { put api_v1_business_company_story_url, params: { mission: "test", vision: "test" }, headers: business_auth_header }

    it "returns 200" do
      aggregate_failures do
        expect(subject).to eq(200)

        res_body = JSON.parse(response.body).deep_symbolize_keys
        expect(res_body[:errors]).to eq({})
        expect(res_body[:companyStory][:mission]).to eq("test")
        expect(res_body[:companyStory][:vision]).to eq("test")

        expect(company.reload.company_story.mission).to eq("test")
        expect(company.company_story.vision).to eq("test")
      end
    end

    context "when the params are invalid" do
      subject { put api_v1_business_company_story_url, params: { mission: "", vision: "" }, headers: business_auth_header }

      it "returns 400" do
        aggregate_failures do
          expect(subject).to eq(400)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:errors]).to be_present
          expect(res_body[:companyStory][:mission]).to eq("")
          expect(res_body[:companyStory][:vision]).to eq("")
        end
      end
    end
  end
end
