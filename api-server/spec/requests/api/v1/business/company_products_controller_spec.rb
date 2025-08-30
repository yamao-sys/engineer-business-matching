# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Business::CompanyProductsController, type: :request do
  include_context "with business auth"
  include_context "with files"

  describe "GET #show" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    subject { get api_v1_business_company_product_url, headers: business_auth_header }

    context "when the company has a company story" do
      let!(:company_product) { create(:company_product, company:) }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:name]).to eq(company_product.name)
          expect(res_body[:description]).to eq(company_product.description)
          expect(res_body[:url]).to eq(company_product.url)
          expect(res_body[:logoUrl]).to be_nil
        end
      end

      context "when the company has a logo" do
        let(:logo) { sample_jpg_file }
        let!(:company_product) { create(:company_product, company:, logo:) }

        it "returns 200" do
          aggregate_failures do
            expect(subject).to eq(200)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:logoUrl]).to be_present
          end
        end
      end
    end

    context "when the company does not have a company story" do
      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:name]).to be_nil
          expect(res_body[:description]).to be_nil
          expect(res_body[:url]).to be_nil
          expect(res_body[:logoUrl]).to be_nil
        end
      end
    end
  end

  describe "PUT #update" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    let(:name) { "test name" }
    let(:description) { "test description" }
    let(:url) { "test url" }
    let(:logo) { nil }
    let(:params) do
      { name:, description:, url:, logo: }
    end

    subject { put api_v1_business_company_product_url, params:, headers: business_auth_header }

    context "when company does not have a company product" do
      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:errors]).to eq({})
          expect(res_body[:companyProduct][:name]).to eq(name)
          expect(res_body[:companyProduct][:description]).to eq(description)
          expect(res_body[:companyProduct][:url]).to eq(url)
          expect(res_body[:companyProduct][:logoUrl]).to be_nil

          expect(company.reload.company_product.name).to eq(name)
          expect(company.company_product.description).to eq(description)
          expect(company.company_product.url).to eq(url)
          expect(company.company_product.logo).to be_nil
        end
      end

      context "when the params are valid" do
        let(:logo) { sample_jpg_file }
        subject { put api_v1_business_company_product_url, params:, headers: business_auth_header }

        it "returns 200" do
          aggregate_failures do
            expect(subject).to eq(200)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:errors]).to eq({})

            expect(res_body[:companyProduct][:name]).to eq(name)
            expect(res_body[:companyProduct][:description]).to eq(description)
            expect(res_body[:companyProduct][:url]).to eq(url)
            expect(res_body[:companyProduct][:logoUrl]).to be_present

            expect(company.reload.company_product.name).to eq(name)
            expect(company.company_product.description).to eq(description)
            expect(company.company_product.url).to eq(url)
            expect(company.company_product.logo.url).to be_present
          end
        end
      end

      context "when the params are invalid" do
        subject { put api_v1_business_company_product_url, params: { name: "", description: "", url: "" }, headers: business_auth_header }

        it "returns 400" do
          aggregate_failures do
            expect(subject).to eq(400)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:errors]).to be_present
            expect(res_body[:companyProduct][:name]).to eq("")
            expect(res_body[:companyProduct][:description]).to eq("")
            expect(res_body[:companyProduct][:url]).to eq("")
            expect(res_body[:companyProduct][:logoUrl]).to be_nil
          end
        end
      end
    end

    context "when company has company product" do
      let(:company_product_logo) { nil }
      let!(:company_product) { create(:company_product, company:, logo: company_product_logo) }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:errors]).to eq({})
          expect(res_body[:companyProduct][:name]).to eq(name)
          expect(res_body[:companyProduct][:description]).to eq(description)
          expect(res_body[:companyProduct][:url]).to eq(url)
          expect(res_body[:companyProduct][:logoUrl]).to be_nil

          expect(company_product.reload.name).to eq(name)
          expect(company_product.description).to eq(description)
          expect(company_product.url).to eq(url)
          expect(company_product.logo).to be_nil
        end
      end

      context "when the params are valid" do
        let(:company_product_logo) { nil }

        subject { put api_v1_business_company_product_url, params:, headers: business_auth_header }

        it "returns 200" do
          aggregate_failures do
            expect(subject).to eq(200)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:errors]).to eq({})

            expect(res_body[:errors]).to eq({})
            expect(res_body[:companyProduct][:name]).to eq(name)
            expect(res_body[:companyProduct][:description]).to eq(description)
            expect(res_body[:companyProduct][:url]).to eq(url)
            expect(res_body[:companyProduct][:logoUrl]).to be_nil

            expect(company_product.reload.name).to eq(name)
            expect(company_product.description).to eq(description)
            expect(company_product.url).to eq(url)
            expect(company_product.logo).to be_nil
          end
        end
      end

      context "when the logo is updated" do
        let(:company_product_logo) { sample_jpg_file }

        subject { put api_v1_business_company_product_url, params:, headers: business_auth_header }

        context "when the logo is nil" do
          it "detaches the logo" do
            aggregate_failures do
              expect(subject).to eq(200)

              res_body = JSON.parse(response.body).deep_symbolize_keys
              expect(res_body[:errors]).to eq({})

              expect(res_body[:companyProduct][:name]).to eq(name)
              expect(res_body[:companyProduct][:description]).to eq(description)
              expect(res_body[:companyProduct][:url]).to eq(url)
              expect(res_body[:companyProduct][:logoUrl]).to be_nil

              expect(company_product.reload.name).to eq(name)
              expect(company_product.description).to eq(description)
              expect(company_product.url).to eq(url)
              expect(company_product.logo).to be_nil
            end
          end
        end

        context "when the logo is present" do
          let(:logo) { Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/sample.jpg")) }

          it "update the logo" do
            aggregate_failures do
              expect(subject).to eq(200)

              res_body = JSON.parse(response.body).deep_symbolize_keys
              expect(res_body[:errors]).to eq({})

              expect(res_body[:companyProduct][:name]).to eq(name)
              expect(res_body[:companyProduct][:description]).to eq(description)
              expect(res_body[:companyProduct][:url]).to eq(url)
              expect(res_body[:companyProduct][:logoUrl]).to be_present

              expect(company_product.reload.name).to eq(name)
              expect(company_product.description).to eq(description)
              expect(company_product.url).to eq(url)
              expect(company_product.logo.url).to be_present
            end
          end
        end
      end

      context "when the params are invalid" do
        let(:name) { "" }
        let(:description) { "" }
        let(:url) { "" }

        subject { put api_v1_business_company_product_url, params:, headers: business_auth_header }

        it "returns 400" do
          aggregate_failures do
            expect(subject).to eq(400)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:errors]).to be_present
            expect(res_body[:companyProduct][:name]).to eq("")
            expect(res_body[:companyProduct][:description]).to eq("")
            expect(res_body[:companyProduct][:url]).to eq("")
            expect(res_body[:companyProduct][:logoUrl]).to be_nil
          end
        end
      end
    end
  end
end
