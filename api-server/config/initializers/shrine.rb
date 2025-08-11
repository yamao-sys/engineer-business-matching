require "shrine"
require "shrine/storage/file_system"
require "shrine/storage/s3"

s3_options = {
  endpoint: ENV["S3_ENDPOINT"],
  access_key_id: ENV["S3_ACCESS_KEY"],
  secret_access_key: ENV["S3_SECRET_KEY"],
  region: ENV["S3_REGION"],
  bucket: ENV["S3_BUCKET"],
  force_path_style: true
}

Shrine.storages = {
  cache: Shrine::Storage::S3.new(prefix: "cache", **s3_options),
  store: Shrine::Storage::S3.new(prefix: "store", **s3_options)
}

Shrine.plugin :activerecord
Shrine.plugin :cached_attachment_data
Shrine.plugin :download_endpoint, host: ENV["S3_HOST"]
Shrine.plugin :restore_cached_data # NOTE: キャッシュからメタ情報復元
Shrine.plugin :determine_mime_type # NOTE: MIMEタイプを自動判定
Shrine.plugin :validation_helpers
