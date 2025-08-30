# frozen_string_literal: true

FactoryBot.define do
  factory :company_story do
    mission { Faker::Lorem.sentence }
    vision { Faker::Lorem.sentence }
  end
end
