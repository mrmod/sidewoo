require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Sidewoo
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    Aws.config.update(
      endpoint: 'http://localhost:9000',
      access_key_id: 'minioadmin',
      secret_access_key: 'minioadmin',
      force_path_style: true,
      region: 'us-east-1',
    )
    config.media_bucket = 'media'
    config.s3 = Aws::S3::Client.new
    begin
      config.s3.create_bucket bucket: config.media_bucket
    rescue Aws::S3::Errors::BucketAlreadyExists, Aws::S3::Errors::BucketAlreadyOwnedByYou
    end
    config.google_maps_api_key = ENV['GOOGLE_MAPS_API_KEY']
    unless Rails.env.production?
      minio_client = ENV['MINIO_CLIENT']
      minio_url = ENV['MINIO_URL']
      minio_host = ENV['MINIO_HOST']
      minio_access_key = ENV['MINIO_ACCESS_KEY']
      minio_secret_key = ENV['MINIO_SECRET_KEY']
      minio_policy = ENV['MINIO_POLICY']
      puts "EXEC: #{minio_client} host add #{minio_host} #{minio_url} #{minio_access_key} #{minio_secret_key}"

      `#{minio_client} host add #{minio_host} #{minio_url} #{minio_access_key} #{minio_secret_key}`
      `#{minio_client} policy set-json #{minio_policy} #{minio_host}/#{config.media_bucket}`
    end
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
