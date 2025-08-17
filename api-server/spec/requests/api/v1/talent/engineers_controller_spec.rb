# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Talent::EngineersController, type: :request do
  describe "POST #validate_sign_up" do
    include_context "with files"

    let(:params) { { firstName:, lastName:, email:, password:, birthday:, frontIdentification:, backIdentification: } }

    subject { post validate_sign_up_api_v1_talent_engineers_url, params: }

    context "when the params are valid" do
      let(:firstName) { "test_first_name" }
      let(:lastName) { "test_last_name" }
      let(:email) { "test@example.com" }
      let(:password) { "password" }
      let(:birthday) { "2000-01-01" }
      let(:frontIdentification) { sample_jpg_file }
      let(:backIdentification) { sample_jpg_file }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:errors]).to eq({})
        end
      end
    end

    context "when the params are invalid" do
      context "when the first name is blank" do
        let(:firstName) { "" }
        let(:lastName) { "test_last_name" }
        let(:email) { "test@example.com" }
        let(:password) { "password" }
        let(:birthday) { "2000-01-01" }
        let(:frontIdentification) { sample_jpg_file }
        let(:backIdentification) { sample_jpg_file }

        it "returns 400" do
          aggregate_failures do
            expect(subject).to eq(400)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expected_errors = { first_name: [ "名を入力してください。" ] }
            expect(res_body[:errors]).to eq(expected_errors)
          end
        end
      end
    end
  end

  describe "POST #sign_up" do
    include_context "with files"

    let(:params) { { firstName:, lastName:, email:, password:, birthday:, frontIdentification:, backIdentification: } }

    subject { post sign_up_api_v1_talent_engineers_url, params: }

    context "when the params are valid" do
      let(:firstName) { "test_first_name" }
      let(:lastName) { "test_last_name" }
      let(:email) { "test@example.com" }
      let(:password) { "password" }
      let(:birthday) { "2000-01-01" }
      let(:frontIdentification) { sample_jpg_file }
      let(:backIdentification) { sample_jpg_file }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:errors]).to eq({})

          created_engineer = Engineer.find_by(email:)
          expect(created_engineer.first_name).to eq(firstName)
          expect(created_engineer.last_name).to eq(lastName)
          expect(created_engineer.email).to eq(email)
          expect(created_engineer.password_digest).to be_present
          expect(created_engineer.birthday).to eq(Date.parse(birthday))
          expect(created_engineer.front_identification.metadata["filename"]).to eq("sample.jpg")
          expect(created_engineer.back_identification.metadata["filename"]).to eq("sample.jpg")
        end
      end
    end

    context "when the params are invalid" do
      context "when the first name is blank" do
        let(:firstName) { "" }
        let(:lastName) { "test_last_name" }
        let(:email) { "test@example.com" }
        let(:password) { "password" }
        let(:birthday) { "2000-01-01" }
        let(:frontIdentification) { sample_jpg_file }
        let(:backIdentification) { sample_jpg_file }

        it "returns 400" do
          aggregate_failures do
            expect(subject).to eq(400)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expected_errors = { first_name: [ "名を入力してください。" ] }
            expect(res_body[:errors]).to eq(expected_errors)

            created_engineer = Engineer.find_by(email:)
            expect(created_engineer).to be_nil
          end
        end
      end
    end
  end

  describe "POST #sign_in" do
    let!(:engineer) { create(:engineer, email: "test@example.com", password: "password") }

    let(:params) { { email:, password: } }

    subject { post sign_in_api_v1_talent_engineers_url, params: }

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
