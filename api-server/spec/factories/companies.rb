# frozen_string_literal: true

FactoryBot.define do
  factory :company do
    name { Faker::Company.name }
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password(min_length: 8, max_length: 24) }
    address { Faker::Address.full_address }
    site_url { Faker::Internet.url }
    employee_count { Faker::Number.between(from: 1, to: 1000) }
  end
end
