from flask import request, Flask, jsonify
from flask_cors import CORS
from torchvision import transforms
from werkzeug.utils import secure_filename
import os
from transformers import GPT2TokenizerFast, ViTImageProcessor, VisionEncoderDecoderModel
from torch.utils.data import Dataset
# from torchtext.data import get_tokenizer
import requests
import torch
import numpy as np
from PIL import Image
import pickle
import matplotlib.pyplot as plt
import os
from tqdm import tqdm

import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)

UPLOAD_FOLDER = os.path.join(app.root_path, 'static', 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

CORS(app, supports_credentials=True)


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

# Import thư viện để gọi hàm dự đoán caption
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def predict_caption(image):
    img = Image.open(image)

    model = VisionEncoderDecoderModel.from_pretrained(
        "nlpconnect/vit-gpt2-image-captioning")
    image_processor = ViTImageProcessor.from_pretrained(
        "nlpconnect/vit-gpt2-image-captioning")
    tokenizer = GPT2TokenizerFast.from_pretrained(
        "nlpconnect/vit-gpt2-image-captioning")

    pixel_values = image_processor(img, return_tensors="pt").pixel_values
    generated_ids = model.generate(pixel_values, max_new_tokens=30)
    caption = tokenizer.batch_decode(
        generated_ids, skip_special_tokens=True)[0]

    return caption


@app.route('/')
def index():
    return {'message': 'hello'}


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        resp = jsonify({
            "message": 'No file part in the request',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp

    files = request.files.getlist('file')

    captions = []

    for img in files:
        if img and allowed_file(img.filename):
            filename = secure_filename(img.filename)
            path = os.path.join(UPLOAD_FOLDER, filename)
            img.save(path)
            # print(path)

            caption = predict_caption(img)
            captions.append(caption)

    resp = jsonify({
        "captions": captions,
        "status": 'success',
    })
    resp.status_code = 201
    return resp


if __name__ == "__main__":
    app.run(debug=True)
