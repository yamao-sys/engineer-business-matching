# frozen_string_literal: true

FactoryBot.define do
  factory :company_member do
    name { Faker::Name.name }
    description { Faker::Lorem.sentence }
    position { Faker::Lorem.sentence }
  end
end
