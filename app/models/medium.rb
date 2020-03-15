class Medium < ApplicationRecord
    belongs_to :mediumable, polymorphic: true
    def self.s3_create(uploaded_file)
        s3 = Rails.configuration.s3
        bucket = Rails.configuration.media_bucket
        key = "#{uploaded_file.original_filename}__#{DateTime.now.to_i}"

        s3.put_object(
            key: key,
            bucket: bucket,
            content_type: uploaded_file.content_type,
            body: uploaded_file.tempfile,
        )
        s3_object = Aws::S3::Object.new bucket_name: bucket, key: key

        puts "Created public URL: #{s3_object.public_url}"
        {
            url: s3_object.public_url,
            name: key,
        }
    end
end
