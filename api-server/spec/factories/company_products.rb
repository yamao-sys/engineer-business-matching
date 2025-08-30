# frozen_string_literal: true

FactoryBot.define do
  factory :company_product do
    name { Faker::Lorem.sentence }
    description { Faker::Lorem.sentence }
    url { Faker::Internet.url }
  end
end
