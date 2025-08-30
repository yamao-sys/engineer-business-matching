# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Business::CompanyProductsController, type: :request do
  include_context "with business auth"
  include_context "with files"

  describe "GET #index" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }
    let!(:company_products) { create_list(:company_product, 3, company:) }

    before do
      company_products.last.update(logo: sample_jpg_file)
    end

    subject { get api_v1_business_company_products_url, headers: business_auth_header }

    it "returns 200" do
      aggregate_failures do
        expect(subject).to eq(200)

        res_body = JSON.parse(response.body).map(&:deep_symbolize_keys)
        company_products.each_with_index do |company_product, index|
          expect(res_body[index][:id]).to eq(company_product.id)
          expect(res_body[index][:name]).to eq(company_product.name)
          expect(res_body[index][:description]).to eq(company_product.description)
          expect(res_body[index][:url]).to eq(company_product.url)
          if index == company_products.size - 1
            expect(res_body[index][:logoUrl]).to be_present
          else
            expect(res_body[index][:logoUrl]).to be_nil
          end
        end
      end
    end
  end

  describe "POST #create" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    let(:name) { "test name" }
    let(:description) { "test description" }
    let(:url) { "test url" }
    let(:logo) { sample_jpg_file }
    let(:params) { { name:, description:, url:, logo: } }

    subject { post api_v1_business_company_products_url, params:, headers: business_auth_header }

    it "returns 200" do
      aggregate_failures do
        expect(subject).to eq(200)

        res_body = JSON.parse(response.body).deep_symbolize_keys
        created_company_product = company.reload.company_products.first
        expect(res_body[:companyProduct][:id]).to eq(created_company_product.id)
        expect(res_body[:companyProduct][:name]).to eq(name)
        expect(res_body[:companyProduct][:description]).to eq(description)
        expect(res_body[:companyProduct][:url]).to eq(url)
        expect(res_body[:companyProduct][:logoUrl]).to be_present

        expect(res_body[:errors]).to eq({})

        expect(company.company_products.count).to eq(1)
        expect(created_company_product.name).to eq(name)
        expect(created_company_product.description).to eq(description)
        expect(created_company_product.url).to eq(url)
        expect(created_company_product.logo.url).to be_present
      end
    end

    context "when the params are invalid" do
      let(:name) { "" }
      let(:description) { "" }
      let(:url) { "" }
      let(:logo) { sample_jpg_file }
      subject { post api_v1_business_company_products_url, params:, headers: business_auth_header }

      it "returns 400" do
        aggregate_failures do
          expect(subject).to eq(400)
          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:companyProduct][:id]).to be_nil
          expect(res_body[:companyProduct][:name]).to eq(name)
          expect(res_body[:companyProduct][:description]).to eq(description)
          expect(res_body[:companyProduct][:url]).to eq(url)
          expect(res_body[:companyProduct][:logoUrl]).to be_nil

          expect(res_body[:errors]).to be_present

          expect(company.reload.company_products.count).to eq(0)
        end
      end
    end
  end

  describe "GET #show" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    let(:id) { company_product.id }

    subject { get api_v1_business_company_product_url(id), headers: business_auth_header }

    context "when the company has a company story" do
      let!(:company_product) { create(:company_product, company:) }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:id]).to eq(company_product.id)
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
      let(:id) { 0 }

      it "returns 404" do
        expect(subject).to eq(404)
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

    let(:id) { company_product.id }

    subject { put api_v1_business_company_product_url(id), params:, headers: business_auth_header }

    context "when company has company product" do
      let(:company_product_logo) { nil }
      let!(:company_product) { create(:company_product, company:, logo: company_product_logo) }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:errors]).to eq({})
          expect(res_body[:companyProduct][:id]).to eq(company_product.id)
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

        it "returns 200" do
          aggregate_failures do
            expect(subject).to eq(200)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:errors]).to eq({})

            expect(res_body[:errors]).to eq({})
            expect(res_body[:companyProduct][:id]).to eq(company_product.id)
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

        context "when the logo is nil" do
          it "detaches the logo" do
            aggregate_failures do
              expect(subject).to eq(200)

              res_body = JSON.parse(response.body).deep_symbolize_keys
              expect(res_body[:errors]).to eq({})

              expect(res_body[:companyProduct][:id]).to eq(company_product.id)
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

              expect(res_body[:companyProduct][:id]).to eq(company_product.id)
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

        it "returns 400" do
          aggregate_failures do
            expect(subject).to eq(400)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:errors]).to be_present
            expect(res_body[:companyProduct][:id]).to eq(company_product.id)
            expect(res_body[:companyProduct][:name]).to eq("")
            expect(res_body[:companyProduct][:description]).to eq("")
            expect(res_body[:companyProduct][:url]).to eq("")
            expect(res_body[:companyProduct][:logoUrl]).to be_nil
          end
        end
      end
    end

    context "when company does not have a company product" do
      let(:id) { 0 }

      it "returns 404" do
        expect(subject).to eq(404)
      end
    end
  end

  describe "DELETE #delete" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    let(:id) { company_product.id }

    subject { delete api_v1_business_company_product_url(id), headers: business_auth_header }

    context "when company has a company product" do
      let!(:company_product) { create(:company_product, company:) }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:id]).to eq(company_product.id)
          expect(res_body[:name]).to eq(company_product.name)
          expect(res_body[:description]).to eq(company_product.description)
          expect(res_body[:url]).to eq(company_product.url)
          expect(res_body[:logoUrl]).to be_nil

          expect(CompanyProduct.exists?(id: company_product.id)).to be_falsey
        end
      end
    end

    context "when company does not have a company product" do
      let(:id) { 0 }

      it "returns 404" do
        expect(subject).to eq(404)
      end
    end
  end
end
