require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Sidewoo
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    aws_endpoint = ENV['AWS_ENDPOINT'] || 'http://localhost:9000'
    access_key_id = ENV['AWS_ACCESS_KEY_ID'] || 'minioadmin'
    secret_access_key = ENV['AWS_SECRET_KEY'] || 'minioadmin'
    aws_region = ENV['AWS_REGION'] || 'us-east-1'
    media_bucket = ENV['MEDIA_BUCKET'] || 'media'
    Aws.config.update(
      endpoint: aws_endpoint,
      access_key_id: access_key_id,
      secret_access_key: secret_access_key,
      force_path_style: true,
      region: aws_region,
    )
    config.media_bucket = media_bucket
    unless Rails.env.production?
      config.s3 = Aws::S3::Client.new
      begin
        config.s3.create_bucket bucket: config.media_bucket
      rescue Aws::S3::Errors::BucketAlreadyExists, Aws::S3::Errors::BucketAlreadyOwnedByYou
      end
    end
    config.google_maps_api_key = ENV['GOOGLE_MAPS_API_KEY']

    minio_client = ENV['MINIO_CLIENT']
    minio_url = ENV['MINIO_URL']
    minio_host = ENV['MINIO_HOST']
    minio_access_key = ENV['MINIO_ACCESS_KEY']
    minio_secret_key = ENV['MINIO_SECRET_KEY']
    unless Rails.env.production?
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
