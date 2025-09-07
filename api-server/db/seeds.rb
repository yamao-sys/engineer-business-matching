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
test_company_product_1 = CompanyProduct.new(company: test_company_company_product, name: "test_company_product_1", description: "test_company_product_1_description", url: "http://example.com/1")
test_company_product_2 = CompanyProduct.new(company: test_company_company_product, name: "test_company_product_2", description: "test_company_product_2_description", url: "http://example.com/2")
test_company_product_3 = CompanyProduct.new(company: test_company_company_product, name: "test_company_product_3", description: "test_company_product_3_description", url: "http://example.com/3")
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

Company.create!(name: "test_company_company_product_2", email: "test_company_company_product_2@example.com", password: "password")

Company.create!(name: "test_company_company_product_3", email: "test_company_company_product_3@example.com", password: "password")

test_company_company_product_4 = Company.create!(name: "test_company_company_product_4", email: "test_company_company_product_4@example.com", password: "password")
test_company_product_4 = CompanyProduct.new(company: test_company_company_product_4, name: "test_company_product_4", description: "test_company_product_4_description", url: "http://example.com/4")
File.open(Rails.root.join("spec/fixtures/sample.jpg"), "r") do |file|
  test_company_product_4.logo_attacher.assign(file)
end
test_company_product_4.save!

test_company_company_product_5 = Company.create!(name: "test_company_company_product_5", email: "test_company_company_product_5@example.com", password: "password")
test_company_product_5 = CompanyProduct.new(company: test_company_company_product_5, name: "test_company_product_5", description: "test_company_product_5_description", url: "http://example.com/5")
File.open(Rails.root.join("spec/fixtures/sample.jpg"), "r") do |file|
  test_company_product_5.logo_attacher.assign(file)
end
test_company_product_5.save!

test_company_company_product_6 = Company.create!(name: "test_company_company_product_6", email: "test_company_company_product_6@example.com", password: "password")
test_company_product_6 = CompanyProduct.new(company: test_company_company_product_6, name: "test_company_product_6", description: "test_company_product_6_description", url: "http://example.com/6")
File.open(Rails.root.join("spec/fixtures/sample.jpg"), "r") do |file|
  test_company_product_6.logo_attacher.assign(file)
end
test_company_product_6.save!

test_company_tech_blog = Company.create!(name: "test_company_tech_blog", email: "test_company_tech_blog@example.com", password: "password")
TechBlog.create!(company: test_company_tech_blog, title: "test_company_tech_blog_1_title", url: "http://example.com/1", published_at: Date.parse("2024-12-31"))
TechBlog.create!(company: test_company_tech_blog, title: "test_company_tech_blog_2_title", url: "http://example.com/2", published_at: Date.parse("2024-12-31"))
TechBlog.create!(company: test_company_tech_blog, title: "test_company_tech_blog_3_title", url: "http://example.com/3", published_at: Date.parse("2024-12-31"))

Company.create!(name: "test_company_tech_blog_2", email: "test_company_tech_blog_2@example.com", password: "password")

Company.create!(name: "test_company_tech_blog_3", email: "test_company_tech_blog_3@example.com", password: "password")

test_company_tech_blog_4 = Company.create!(name: "test_company_tech_blog_4", email: "test_company_tech_blog_4@example.com", password: "password")
TechBlog.create!(company: test_company_tech_blog_4, title: "test_company_tech_blog_4_title", url: "http://example.com/4", published_at: Date.parse("2024-12-31"))

test_company_tech_blog_5 = Company.create!(name: "test_company_tech_blog_5", email: "test_company_tech_blog_5@example.com", password: "password")
TechBlog.create!(company: test_company_tech_blog_5, title: "test_company_tech_blog_5_title", url: "http://example.com/5", published_at: Date.parse("2024-12-31"))

test_company_tech_blog_6 = Company.create!(name: "test_company_tech_blog_6", email: "test_company_tech_blog_6@example.com", password: "password")
TechBlog.create!(company: test_company_tech_blog_6, title: "test_company_tech_blog_6_title", url: "http://example.com/6", published_at: Date.parse("2024-12-31"))

# NOTE: /company-membersのページのE2Eデータ
test_company_member = Company.create!(name: "test_company_member", email: "test_company_member@example.com", password: "password")
test_company_member_1 = CompanyMember.new(company: test_company_member, name: "test_company_member_1_name", position: "test_company_member_1_position", description: "test_company_member_1_description")
File.open(Rails.root.join("spec/fixtures/sample.jpg"), "r") do |file|
  test_company_member_1.icon_attacher.assign(file)
end
test_company_member_1.save!

test_company_member_2 = CompanyMember.new(company: test_company_member, name: "test_company_member_2_name", position: "test_company_member_2_position", description: "test_company_member_2_description")
File.open(Rails.root.join("spec/fixtures/sample.jpg"), "r") do |file|
  test_company_member_2.icon_attacher.assign(file)
end
test_company_member_2.save!

test_company_member_3 = CompanyMember.new(company: test_company_member, name: "test_company_member_3_name", position: "test_company_member_3_position", description: "test_company_member_3_description")
File.open(Rails.root.join("spec/fixtures/sample.jpg"), "r") do |file|
  test_company_member_3.icon_attacher.assign(file)
end
test_company_member_3.save!

Company.create!(name: "test_company_member_2", email: "test_company_member_2@example.com", password: "password")

Company.create!(name: "test_company_member_3", email: "test_company_member_3@example.com", password: "password")

test_company_member_4 = Company.create!(name: "test_company_member_4", email: "test_company_member_4@example.com", password: "password")
test_company_member_4 = CompanyMember.new(company: test_company_member_4, name: "test_company_member_4_name", position: "test_company_member_4_position", description: "test_company_member_4_description")
File.open(Rails.root.join("spec/fixtures/sample.jpg"), "r") do |file|
  test_company_member_4.icon_attacher.assign(file)
end
test_company_member_4.save!

test_company_member_5 = Company.create!(name: "test_company_member_5", email: "test_company_member_5@example.com", password: "password")
test_company_member_5 = CompanyMember.new(company: test_company_member_5, name: "test_company_member_5_name", position: "test_company_member_5_position", description: "test_company_member_5_description")
File.open(Rails.root.join("spec/fixtures/sample.jpg"), "r") do |file|
  test_company_member_5.icon_attacher.assign(file)
end
test_company_member_5.save!

test_company_member_6 = Company.create!(name: "test_company_member_6", email: "test_company_member_6@example.com", password: "password")
test_company_member_6 = CompanyMember.new(company: test_company_member_6, name: "test_company_member_6_name", position: "test_company_member_6_position", description: "test_company_member_6_description")
File.open(Rails.root.join("spec/fixtures/sample.jpg"), "r") do |file|
  test_company_member_6.icon_attacher.assign(file)
end
test_company_member_6.save!

Engineer.create!(first_name: "test_engineer_sign_in", last_name: "test_engineer_sign_in", email: "test_engineer_sign_in@example.com", password: "password", birthday: "1990-01-01")

Engineer.create!(first_name: "test_engineer_profile", last_name: "test_engineer_profile", email: "test_engineer_profile@example.com", password: "password", birthday: "1990-01-01")
Engineer.create!(first_name: "test_engineer_profile_2", last_name: "test_engineer_profile_2", email: "test_engineer_profile_2@example.com", password: "password", birthday: "1990-01-01")
