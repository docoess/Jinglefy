import botocore
import boto3
import uuid
import os

IMG_ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
AUDIO_ALLOWED_EXTENSIONS = {"mp3", "ogg", "wav"}

IMG_BUCKET_NAME = os.environ.get("S3_IMG_BUCKET")
S3_IMG_LOCATION = f"https://{IMG_BUCKET_NAME}.s3.amazonaws.com/"

AUDIO_BUCKET_NAME = os.environ.get("S3_AUDIO_BUCKET")
S3_AUDIO_LOCATION = f"https://{AUDIO_BUCKET_NAME}.s3.amazonaws.com/"

s3_img = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_IMG_KEY"),
   aws_secret_access_key=os.environ.get("S3_IMG_SECRET")
)

s3_audio = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_AUDIO_KEY"),
   aws_secret_access_key=os.environ.get("S3_AUDIO_SECRET")
)


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, filetype, acl="public-read"):
    if filetype == 'image':
      try:
          s3_img.upload_fileobj(
              file,
              IMG_BUCKET_NAME,
              file.filename,
              ExtraArgs={
                  "ACL": acl,
                  "ContentType": file.content_type
              }
          )
      except Exception as e:
          # in case the your s3 upload fails
          return {"errors": str(e)}

      return {"url": f"{S3_IMG_LOCATION}{file.filename}"}

    elif filetype == 'audio':
      try:
          s3_audio.upload_fileobj(
              file,
              AUDIO_BUCKET_NAME,
              file.filename,
              ExtraArgs={
                  "ACL": acl,
                  "ContentType": file.content_type
              }
          )
      except Exception as e:
          # in case the your s3 upload fails
        return {"errors": str(e)}

      return {"url": f"{S3_AUDIO_LOCATION}{file.filename}"}


def remove_file_from_s3(file_url, filetype):
    # AWS needs the image file name, not the URL,
    # so you split that out of the URL
    if filetype == 'image':
      key = file_url.rsplit("/", 1)[1]
      try:
          s3_img.delete_object(
          Bucket=IMG_BUCKET_NAME,
          Key=key
          )
      except Exception as e:
          return { "errors": str(e) }
      return True

    elif filetype == 'audio':
      key = file_url.rsplit("/", 1)[1]
      try:
          s3_audio.delete_object(
          Bucket=AUDIO_BUCKET_NAME,
          Key=key
          )
      except Exception as e:
          return { "errors": str(e) }
      return True
