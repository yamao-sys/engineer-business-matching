# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Business::CompanyMembersController, type: :request do
  include_context "with business auth"
  include_context "with files"

  describe "GET #index" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }
    let!(:company_members) { create_list(:company_member, 3, company:) }

    before do
      company_members.last.update(icon: sample_jpg_file)
    end

    subject { get api_v1_business_company_members_url, headers: business_auth_header }

    it "returns 200" do
      aggregate_failures do
        expect(subject).to eq(200)

        res_body = JSON.parse(response.body).map(&:deep_symbolize_keys)
        company_members.each_with_index do |company_member, index|
          expect(res_body[index][:id]).to eq(company_member.id)
          expect(res_body[index][:name]).to eq(company_member.name)
          expect(res_body[index][:description]).to eq(company_member.description)
          expect(res_body[index][:position]).to eq(company_member.position)
          if index == company_members.size - 1
            expect(res_body[index][:iconUrl]).to be_present
          else
            expect(res_body[index][:iconUrl]).to be_nil
          end
        end
      end
    end
  end

  describe "POST #create" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    let(:name) { "test name" }
    let(:description) { "test description" }
    let(:position) { "test position" }
    let(:icon) { sample_jpg_file }
    let(:params) { { name:, description:, position:, icon: } }

    subject { post api_v1_business_company_members_url, params:, headers: business_auth_header }

    it "returns 200" do
      aggregate_failures do
        expect(subject).to eq(200)

        res_body = JSON.parse(response.body).deep_symbolize_keys
        created_company_member = company.reload.company_members.first
        expect(res_body[:companyMember][:id]).to eq(created_company_member.id)
        expect(res_body[:companyMember][:name]).to eq(name)
        expect(res_body[:companyMember][:description]).to eq(description)
        expect(res_body[:companyMember][:position]).to eq(position)
        expect(res_body[:companyMember][:iconUrl]).to be_present

        expect(res_body[:errors]).to eq({})

        expect(company.company_members.count).to eq(1)
        expect(created_company_member.name).to eq(name)
        expect(created_company_member.description).to eq(description)
        expect(created_company_member.position).to eq(position)
        expect(created_company_member.icon.url).to be_present
      end
    end

    context "when the params are invalid" do
      let(:name) { "" }
      let(:description) { "" }
      let(:position) { "" }
      let(:icon) { sample_jpg_file }
      subject { post api_v1_business_company_members_url, params:, headers: business_auth_header }

      it "returns 400" do
        aggregate_failures do
          expect(subject).to eq(400)
          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:companyMember][:id]).to be_nil
          expect(res_body[:companyMember][:name]).to eq(name)
          expect(res_body[:companyMember][:description]).to eq(description)
          expect(res_body[:companyMember][:position]).to eq(position)
          expect(res_body[:companyMember][:iconUrl]).to be_nil

          expect(res_body[:errors]).to be_present

          expect(company.reload.company_members.count).to eq(0)
        end
      end
    end
  end

  describe "GET #show" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    let(:id) { company_member.id }

    subject { get api_v1_business_company_member_url(id), headers: business_auth_header }

    context "when the company has a company member" do
      let!(:company_member) { create(:company_member, company:) }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:id]).to eq(company_member.id)
          expect(res_body[:name]).to eq(company_member.name)
          expect(res_body[:description]).to eq(company_member.description)
          expect(res_body[:position]).to eq(company_member.position)
          expect(res_body[:iconUrl]).to be_nil
        end
      end

      context "when the company has a icon" do
        let(:icon) { sample_jpg_file }
        let!(:company_member) { create(:company_member, company:, icon:) }

        it "returns 200" do
          aggregate_failures do
            expect(subject).to eq(200)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:iconUrl]).to be_present
          end
        end
      end
    end

    context "when the company does not have a company member" do
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
    let(:position) { "test position" }
    let(:icon) { nil }
    let(:params) do
      { name:, description:, position:, icon: }
    end

    let(:id) { company_member.id }

    subject { put api_v1_business_company_member_url(id), params:, headers: business_auth_header }

    context "when company has company member" do
      let(:company_member_icon) { nil }
      let!(:company_member) { create(:company_member, company:, icon: company_member_icon) }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:errors]).to eq({})
          expect(res_body[:companyMember][:id]).to eq(company_member.id)
          expect(res_body[:companyMember][:name]).to eq(name)
          expect(res_body[:companyMember][:description]).to eq(description)
          expect(res_body[:companyMember][:position]).to eq(position)
          expect(res_body[:companyMember][:iconUrl]).to be_nil

          expect(company_member.reload.name).to eq(name)
          expect(company_member.description).to eq(description)
          expect(company_member.position).to eq(position)
          expect(company_member.icon&.url).to be_nil
        end
      end

      context "when the params are valid" do
        let(:company_member_icon) { nil }

        it "returns 200" do
          aggregate_failures do
            expect(subject).to eq(200)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:errors]).to eq({})

            expect(res_body[:errors]).to eq({})
            expect(res_body[:companyMember][:id]).to eq(company_member.id)
            expect(res_body[:companyMember][:name]).to eq(name)
            expect(res_body[:companyMember][:description]).to eq(description)
            expect(res_body[:companyMember][:position]).to eq(position)
            expect(res_body[:companyMember][:iconUrl]).to be_nil

            expect(company_member.reload.name).to eq(name)
            expect(company_member.description).to eq(description)
            expect(company_member.position).to eq(position)
            expect(company_member.icon&.url).to be_nil
          end
        end
      end

      context "when the icon is updated" do
        let(:company_member_icon) { sample_jpg_file }

        context "when the icon is nil" do
          it "detaches the icon" do
            aggregate_failures do
              expect(subject).to eq(200)

              res_body = JSON.parse(response.body).deep_symbolize_keys
              expect(res_body[:errors]).to eq({})

              expect(res_body[:companyMember][:id]).to eq(company_member.id)
              expect(res_body[:companyMember][:name]).to eq(name)
              expect(res_body[:companyMember][:description]).to eq(description)
              expect(res_body[:companyMember][:position]).to eq(position)
              expect(res_body[:companyMember][:iconUrl]).to be_nil

              expect(company_member.reload.name).to eq(name)
              expect(company_member.description).to eq(description)
              expect(company_member.position).to eq(position)
              expect(company_member.icon).to be_nil
            end
          end
        end

        context "when the icon is present" do
          let(:icon) { Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/sample.jpg")) }

          it "update the icon" do
            aggregate_failures do
              expect(subject).to eq(200)

              res_body = JSON.parse(response.body).deep_symbolize_keys
              expect(res_body[:errors]).to eq({})

              expect(res_body[:companyMember][:id]).to eq(company_member.id)
              expect(res_body[:companyMember][:name]).to eq(name)
              expect(res_body[:companyMember][:description]).to eq(description)
              expect(res_body[:companyMember][:position]).to eq(position)
              expect(res_body[:companyMember][:iconUrl]).to be_present

              expect(company_member.reload.name).to eq(name)
              expect(company_member.description).to eq(description)
              expect(company_member.position).to eq(position)
              expect(company_member.icon.url).to be_present
            end
          end
        end
      end

      context "when the params are invalid" do
        let(:name) { "" }
        let(:description) { "" }
        let(:position) { "" }

        it "returns 400" do
          aggregate_failures do
            expect(subject).to eq(400)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:errors]).to be_present
            expect(res_body[:companyMember][:id]).to eq(company_member.id)
            expect(res_body[:companyMember][:name]).to eq("")
            expect(res_body[:companyMember][:description]).to eq("")
            expect(res_body[:companyMember][:position]).to eq("")
            expect(res_body[:companyMember][:iconUrl]).to be_nil
          end
        end
      end
    end

    context "when company does not have a company member" do
      let(:id) { 0 }

      it "returns 404" do
        expect(subject).to eq(404)
      end
    end
  end

  describe "DELETE #delete" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    let(:id) { company_member.id }

    subject { delete api_v1_business_company_member_url(id), headers: business_auth_header }

    context "when company has a company member" do
      let!(:company_member) { create(:company_member, company:) }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:id]).to eq(company_member.id)
          expect(res_body[:name]).to eq(company_member.name)
          expect(res_body[:description]).to eq(company_member.description)
          expect(res_body[:position]).to eq(company_member.position)
          expect(res_body[:iconUrl]).to be_nil

          expect(CompanyMember.exists?(id: company_member.id)).to be_falsey
        end
      end
    end

    context "when company does not have a company member" do
      let(:id) { 0 }

      it "returns 404" do
        expect(subject).to eq(404)
      end
    end
  end
end
