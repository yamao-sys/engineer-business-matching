Company.create!(name: "test_company_sign_in", email: "test_company_sign_in@example.com", password: "password")

Company.create!(name: "test_company_profile", email: "test_company_profile@example.com", password: "password")
Company.create!(name: "test_company_profile_2", email: "test_company_profile_2@example.com", password: "password")
Company.create!(name: "test_company_profile_3", email: "test_company_profile_3@example.com", password: "password")
Company.create!(name: "test_company_profile_4", email: "test_company_profile_4@example.com", password: "password")
Company.create!(name: "test_company_profile_5", email: "test_company_profile_5@example.com", password: "password")

test_company_company_story = Company.create!(name: "test_company_company_story", email: "test_company_company_story@example.com", password: "password")

test_company_company_story_2 = Company.create!(name: "test_company_company_story_2", email: "test_company_company_story_2@example.com", password: "password")
CompanyStory.create!(company: test_company_company_story_2, mission: "test_company_story_mission_2", vision: "test_company_story_vision_2")

test_company_company_story_3 = Company.create!(name: "test_company_company_story_3", email: "test_company_company_story_3@example.com", password: "password")

test_company_company_story_4 = Company.create!(name: "test_company_company_story_4", email: "test_company_company_story_4@example.com", password: "password")
CompanyStory.create!(company: test_company_company_story_4, mission: "test_company_story_mission_4", vision: "test_company_story_vision_4")

# NOTE: /company-productsのページのE2Eデータ
test_company_company_product = Company.create!(name: "test_company_company_product", email: "test_company_company_product@example.com", password: "password")
test_company_product_1 = CompanyProduct.create!(company: test_company_company_product, name: "test_company_product_1", description: "test_company_product_1_description", url: "http://example.com/1")
test_company_product_2 = CompanyProduct.create!(company: test_company_company_product, name: "test_company_product_2", description: "test_company_product_2_description", url: "http://example.com/2")
test_company_product_3 = CompanyProduct.create!(company: test_company_company_product, name: "test_company_product_3", description: "test_company_product_3_description", url: "http://example.com/3")
File.open(Rails.root.join("spec/fixtures/sample.jpg"), "r") do |file|
  test_company_product_1.logo_attacher.assign(file)
end
test_company_product_1.save!
File.open(Rails.root.join("spec/fixtures/sample.jpg"), "r") do |file|
  test_company_product_2.logo_attacher.assign(file)
end
test_company_product_2.save!
File.open(Rails.root.join("spec/fixtures/sample.jpg"), "r") do |file|
  test_company_product_3.logo_attacher.assign(file)
end
test_company_product_3.save!

Engineer.create!(first_name: "test_engineer_sign_in", last_name: "test_engineer_sign_in", email: "test_engineer_sign_in@example.com", password: "password", birthday: "1990-01-01")

Engineer.create!(first_name: "test_engineer_profile", last_name: "test_engineer_profile", email: "test_engineer_profile@example.com", password: "password", birthday: "1990-01-01")
Engineer.create!(first_name: "test_engineer_profile_2", last_name: "test_engineer_profile_2", email: "test_engineer_profile_2@example.com", password: "password", birthday: "1990-01-01")
