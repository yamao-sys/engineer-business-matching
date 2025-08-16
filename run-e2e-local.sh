#!/bin/bash

# シーディング
docker compose run --rm api_server sh -c 'RAILS_ENV=test bundle exec rails db:seed'

# テスト用の環境でAPIサーバを起動
docker compose exec -d api_server rails s -e test -p 4100 -b '0.0.0.0'

# テスト実行
docker compose exec frontend pnpm test:e2e

# テスト用DBのリセット
docker compose run --rm db mysql -h db -u root -p -e "DROP DATABASE engineer_business_matching_test; CREATE DATABASE engineer_business_matching_test;"
docker compose run --rm api_server sh -c 'RAILS_ENV=test rails ridgepole:apply'
