# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Business::CompaniesController, type: :request do
  describe "POST #validate_sign_up" do
    include_context "with files"

    let(:params) { { name:, email:, password:, finalTaxReturn: } }

    subject { post validate_sign_up_api_v1_business_companies_url, params: }

    context "when the params are valid" do
      let(:name) { "test" }
      let(:email) { "test@example.com" }
      let(:password) { "password" }
      let(:finalTaxReturn) { sample_jpg_file }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:errors]).to eq({})
        end
      end
    end

    context "when the params are invalid" do
      context "when the name is blank" do
        let(:name) { "" }
        let(:email) { "test@example.com" }
        let(:password) { "password" }
        let(:finalTaxReturn) { sample_jpg_file }

        it "returns 400" do
          aggregate_failures do
            expect(subject).to eq(400)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expected_errors = { name: [ "企業名を入力してください。" ] }
            expect(res_body[:errors]).to eq(expected_errors)
          end
        end
      end
    end
  end

  describe "POST #sign_up" do
    include_context "with files"

    let(:params) { { name:, email:, password:, finalTaxReturn: } }

    subject { post sign_up_api_v1_business_companies_url, params: }

    context "when the params are valid" do
      let(:name) { "test" }
      let(:email) { "test@example.com" }
      let(:password) { "password" }
      let(:finalTaxReturn) { sample_jpg_file }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:errors]).to eq({})

          created_company = Company.find_by(email:)
          expect(created_company.name).to eq(name)
          expect(created_company.email).to eq(email)
          expect(created_company.password_digest).to be_present
          expect(created_company.final_tax_return.metadata["filename"]).to eq("sample.jpg")
        end
      end
    end

    context "when the params are invalid" do
      context "when the name is blank" do
        let(:name) { "" }
        let(:email) { "test@example.com" }
        let(:password) { "password" }
        let(:finalTaxReturn) { sample_jpg_file }

        it "returns 400" do
          aggregate_failures do
            expect(subject).to eq(400)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expected_errors = { name: [ "企業名を入力してください。" ] }
            expect(res_body[:errors]).to eq(expected_errors)

            created_company = Company.find_by(email:)
            expect(created_company).to be_nil
          end
        end
      end
    end
  end

  describe "POST #sign_in" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    let(:params) { { email:, password: } }

    subject { post sign_in_api_v1_business_companies_url, params: }

    context "when the params are valid" do
      let(:email) { "test@example.com" }
      let(:password) { "password" }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:token]).to be_present
          expect(res_body[:error]).to eq("")
        end
      end
    end

    context "when the params are invalid" do
      context "when the email is invalid" do
        let(:email) { "invalid@example.com" }
        let(:password) { "password" }

        it "returns 400" do
          aggregate_failures do
            expect(subject).to eq(400)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:token]).to be_blank
            expect(res_body[:error]).to eq("メールアドレスまたはパスワードに該当するユーザが見つかりません。")
          end
        end
      end

      context "when the password is invalid" do
        let(:email) { "test@example.com" }
        let(:password) { "invalid" }

        it "returns 400" do
          aggregate_failures do
            expect(subject).to eq(400)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:token]).to be_blank
            expect(res_body[:error]).to eq("メールアドレスまたはパスワードに該当するユーザが見つかりません。")
          end
        end
      end
    end
  end
end
