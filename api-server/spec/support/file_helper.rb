# frozen_string_literal: true

RSpec.shared_context "with files" do
  let!(:sample_jpg_file) { Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/sample.jpg")) }

  let!(:sample_pdf_file) { Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/sample.pdf")) }
end
