# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Talent::ProfilesController, type: :request do
  describe "GET #show" do
    include_context "with talent auth"

    let!(:engineer) { create(:engineer) }

    subject { get api_v1_talent_profile_url, headers: talent_auth_header }

    it "returns 200" do
      aggregate_failures do
        expect(subject).to eq(200)

        res_body = JSON.parse(response.body).deep_symbolize_keys
        expect(res_body[:id]).to eq(engineer.id)
        expect(res_body[:firstName]).to eq(engineer.first_name)
        expect(res_body[:lastName]).to eq(engineer.last_name)
        expect(res_body[:address]).to eq(engineer.address)
        expect(res_body[:currentEmployer]).to eq(engineer.current_employer)
        expect(res_body[:tel]).to eq(engineer.tel)
        expect(res_body[:birthday]).to eq(engineer.birthday.strftime("%Y-%m-%d"))
      end
    end
  end

  describe "PUT #update" do
    include_context "with talent auth"

    let!(:engineer) { create(:engineer) }

    subject { put api_v1_talent_profile_url, params: { firstName: "test", lastName: "test", birthday: "2000-01-01", address: "test", currentEmployer: "test", tel: "09012345678" }, headers: talent_auth_header }

    it "returns 200" do
      aggregate_failures do
        expect(subject).to eq(200)

        res_body = JSON.parse(response.body).deep_symbolize_keys
        expect(res_body[:errors]).to eq({})
        expect(res_body[:engineer][:id]).to eq(engineer.id)
      end
    end

    context "when the params are invalid" do
      subject { put api_v1_talent_profile_url, params: { firstName: "", lastName: "test", birthday: "2000-01-01", address: "test", currentEmployer: "test", tel: "09012345678" }, headers: talent_auth_header }

      it "returns 400" do
        aggregate_failures do
          expect(subject).to eq(400)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:errors]).to be_present
          expect(res_body[:engineer]).to be_present
        end
      end
    end
  end
end
