from flask import Flask, request, render_template, redirect, url_for
import boto3
import uuid
from dotenv import load_dotenv
import os

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

LIARA_ENDPOINT    = os.getenv("LIARA_ENDPOINT")
LIARA_BUCKET_NAME = os.getenv("LIARA_BUCKET_NAME")
LIARA_ACCESS_KEY  = os.getenv("LIARA_ACCESS_KEY")
LIARA_SECRET_KEY  = os.getenv("LIARA_SECRET_KEY")
IMGPROXY_URL      = os.getenv("IMGPROXY_URL") 

img_proxy_conf = {
    "signature": "_",
    "options": "resize:fill:300:400:0",
    "gravity": "gravity:sm",
}

imgproxy_conf = f'{img_proxy_conf["signature"]}/{img_proxy_conf["options"]}/{img_proxy_conf["gravity"]}/plain'

s3 = boto3.client('s3',
                  endpoint_url=LIARA_ENDPOINT,
                  aws_access_key_id=LIARA_ACCESS_KEY,
                  aws_secret_access_key=LIARA_SECRET_KEY)

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            # Generate a unique filename using UUID
            filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1]
            
            # Save file to S3
            s3.upload_fileobj(file, LIARA_BUCKET_NAME, filename)
            
            # Generate the URL for the uploaded file
            url = f"{LIARA_ENDPOINT}/{LIARA_BUCKET_NAME}/{filename}"
            
            # Redirect to images page
            return redirect(url_for('images'))
    return render_template('index.html')

@app.route('/images')
def images():
    # List all objects in the bucket
    response = s3.list_objects_v2(Bucket=LIARA_BUCKET_NAME)
    images = []
    for obj in response.get('Contents', []):
        images.append(f"{IMGPROXY_URL}{imgproxy_conf}/{LIARA_ENDPOINT}/{LIARA_BUCKET_NAME}/{obj['Key']}")
    return render_template('images.html', images=images)

if __name__ == '__main__':
    app.run(debug=True)
