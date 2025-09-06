# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::Business::TechBlogsController, type: :request do
  include_context "with business auth"
  include_context "with files"

  describe "GET #index" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }
    let!(:tech_blogs) { create_list(:tech_blog, 3, company:) }

    subject { get api_v1_business_tech_blogs_url, headers: business_auth_header }

    it "returns 200" do
      aggregate_failures do
        expect(subject).to eq(200)

        res_body = JSON.parse(response.body).map(&:deep_symbolize_keys)
        tech_blogs.each_with_index do |tech_blog, index|
          expect(res_body[index][:id]).to eq(tech_blog.id)
          expect(res_body[index][:title]).to eq(tech_blog.title)
          expect(res_body[index][:url]).to eq(tech_blog.url)
          expect(res_body[index][:publishedAt]).to eq(tech_blog.published_at.strftime("%Y-%m-%d"))
        end
      end
    end
  end

  describe "POST #create" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    let(:title) { "test title" }
    let(:publishedAt) { Date.today }
    let(:url) { "https://exmaple.com" }
    let(:params) { { title:, url:, publishedAt: } }

    subject { post api_v1_business_tech_blogs_url, params:, headers: business_auth_header }

    it "returns 200" do
      aggregate_failures do
        expect(subject).to eq(200)

        res_body = JSON.parse(response.body).deep_symbolize_keys
        created_tech_blog = company.reload.tech_blogs.first
        expect(res_body[:techBlog][:id]).to eq(created_tech_blog.id)
        expect(res_body[:techBlog][:title]).to eq(title)
        expect(res_body[:techBlog][:publishedAt]).to eq(publishedAt.strftime("%Y-%m-%d"))
        expect(res_body[:techBlog][:url]).to eq(url)

        expect(res_body[:errors]).to eq({})

        expect(company.tech_blogs.count).to eq(1)
        expect(created_tech_blog.title).to eq(title)
        expect(created_tech_blog.published_at).to eq(publishedAt)
        expect(created_tech_blog.url).to eq(url)
      end
    end

    context "when the params are invalid" do
      let(:title) { "" }
      let(:url) { "" }
      let(:publishedAt) { "" }

      subject { post api_v1_business_tech_blogs_url, params:, headers: business_auth_header }

      it "returns 400" do
        aggregate_failures do
          expect(subject).to eq(400)
          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:techBlog][:id]).to be_nil
          expect(res_body[:techBlog][:title]).to eq(title)
          expect(res_body[:techBlog][:publishedAt]).to be_nil
          expect(res_body[:techBlog][:url]).to eq(url)

          expect(res_body[:errors]).to be_present

          expect(company.reload.tech_blogs.count).to eq(0)
        end
      end
    end
  end

  describe "GET #show" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    let(:id) { tech_blog.id }

    subject { get api_v1_business_tech_blog_url(id), headers: business_auth_header }

    context "when the company has a tech blog" do
      let!(:tech_blog) { create(:tech_blog, company:) }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:id]).to eq(tech_blog.id)
          expect(res_body[:title]).to eq(tech_blog.title)
          expect(res_body[:publishedAt]).to eq(tech_blog.published_at.strftime("%Y-%m-%d"))
          expect(res_body[:url]).to eq(tech_blog.url)
        end
      end
    end

    context "when the company does not have a tech blog" do
      let(:id) { 0 }

      it "returns 404" do
        expect(subject).to eq(404)
      end
    end
  end

  describe "PUT #update" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    let(:title) { "test title" }
    let(:url) { "https://exmaple.com" }
    let(:publishedAt) { Date.today }
    let(:params) do
      { title:, url:, publishedAt: }
    end

    let(:id) { tech_blog.id }

    subject { put api_v1_business_tech_blog_url(id), params:, headers: business_auth_header }

    context "when company has tech blog" do
      let!(:tech_blog) { create(:tech_blog, company:) }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:errors]).to eq({})
          expect(res_body[:techBlog][:id]).to eq(tech_blog.id)
          expect(res_body[:techBlog][:title]).to eq(title)
          expect(res_body[:techBlog][:publishedAt]).to eq(publishedAt.strftime("%Y-%m-%d"))
          expect(res_body[:techBlog][:url]).to eq(url)

          expect(tech_blog.reload.title).to eq(title)
          expect(tech_blog.published_at).to eq(publishedAt)
          expect(tech_blog.url).to eq(url)
        end
      end

      context "when the params are invalid" do
        let(:title) { "" }
        let(:publishedAt) { "" }
        let(:url) { "" }

        it "returns 400" do
          aggregate_failures do
            expect(subject).to eq(400)

            res_body = JSON.parse(response.body).deep_symbolize_keys
            expect(res_body[:errors]).to be_present
            expect(res_body[:techBlog][:id]).to eq(tech_blog.id)
            expect(res_body[:techBlog][:title]).to eq("")
            expect(res_body[:techBlog][:publishedAt]).to be_nil
            expect(res_body[:techBlog][:url]).to eq("")
          end
        end
      end
    end

    context "when company does not have a tech blog" do
      let(:id) { 0 }

      it "returns 404" do
        expect(subject).to eq(404)
      end
    end
  end

  describe "DELETE #delete" do
    let!(:company) { create(:company, email: "test@example.com", password: "password") }

    let(:id) { tech_blog.id }

    subject { delete api_v1_business_tech_blog_url(id), headers: business_auth_header }

    context "when company has a tech blog" do
      let!(:tech_blog) { create(:tech_blog, company:) }

      it "returns 200" do
        aggregate_failures do
          expect(subject).to eq(200)

          res_body = JSON.parse(response.body).deep_symbolize_keys
          expect(res_body[:id]).to eq(tech_blog.id)
          expect(res_body[:title]).to eq(tech_blog.title)
          expect(res_body[:publishedAt]).to eq(tech_blog.published_at.strftime("%Y-%m-%d"))
          expect(res_body[:url]).to eq(tech_blog.url)

          expect(TechBlog.exists?(id: tech_blog.id)).to be_falsey
        end
      end
    end

    context "when company does not have a tech blog" do
      let(:id) { 0 }

      it "returns 404" do
        expect(subject).to eq(404)
      end
    end
  end
end
