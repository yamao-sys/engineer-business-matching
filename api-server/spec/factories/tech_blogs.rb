# frozen_string_literal: true

FactoryBot.define do
  factory :tech_blog do
    association :company
    url { Faker::Internet.url }
    title { Faker::Lorem.sentence }
    published_at { Faker::Date.between(from: 1.year.ago, to: Date.today) }
  end
end
