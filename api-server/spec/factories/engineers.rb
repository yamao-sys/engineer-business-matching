# frozen_string_literal: true

FactoryBot.define do
  factory :engineer do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password(min_length: 8, max_length: 24) }
    birthday { Faker::Date.birthday(min_age: 18, max_age: 65) }
  end
end
