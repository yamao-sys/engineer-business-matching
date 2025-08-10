# NOTE: ridgepoleでスキーマ変更を行うにあたり、rails組み込みのdb系コマンドで使用が想定されるものを置き換え
namespace :db do
  Rake::Task["db:migrate"].clear
  Rake::Task["db:migrate:status"].clear
  Rake::Task["db:rollback"].clear

  desc "Apply database schema (options: DRYRUN=false, VERBOSE=false)"

  task migrate: :environment do
    Rake::Task["ridgepole:apply"].invoke
  end

  namespace :schema do
    Rake::Task["db:schema:dump"].clear
    Rake::Task["db:schema:load"].clear

    desc "Creates a db/Schemafile"
    task dump: :environment do
      Rake::Task["ridgepole:export"].invoke
    end

    desc "Loads a Schemafile into the database"
    task load: :environment do
      Rake::Task["ridgepole:apply"].invoke
    end
  end
end

namespace :ridgepole do
  desc "Apply database schema (options: DRYRUN=false, VERBOSE=false)"

  task apply: :environment do
    options = [ "--apply", "--drop-table" ]
    options << "--dry-run" if ENV["DRYRUN"]
    options << "--verbose" if ENV["VERBOSE"]

    is_succeeded = ridgepole(*options, "--file #{schema_file}")
    # NOTE: Failしたらstatus 1で終了する
    exit! unless is_succeeded
  end

  desc "Export database schema"
  task export: :environment do
    options = [ "--export" ]
    ridgepole(*options, "--output #{schema_file}")
  end

  def schema_file
    Rails.root.join("db/Schemafile")
  end

  def config_file
    Rails.root.join("config/database.yml")
  end

  def ridgepole(*options)
    command = [ "bundle exec ridgepole", "--config #{config_file} --env #{Rails.env} -s primary" ]
    system [ command + options ].join(" ")
  end
end
