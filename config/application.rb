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

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
