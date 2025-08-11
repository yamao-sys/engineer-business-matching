module FileUploadable
  extend ActiveSupport::Concern

  class FileUploader < Shrine
  end

  class_methods do
    def has_attached_file(name = :image)
      include FileUploader::Attachment.new(name)

      # NOTE: 共通バリデーション
      FileUploader::Attacher.validate do
        validate_max_size 5 * 1024 * 1024, message: "5MBを超える画像はアップロードできません。"
        validate_mime_type_inclusion %w[image/jpeg image/jpg image/png image/gif image/pjpeg image/x-png application/octet-stream]
      end
    end
  end
end
