from flask import request, Flask, jsonify
from flask_cors import CORS
from torchvision import transforms
from werkzeug.utils import secure_filename
import os
from transformers import GPT2TokenizerFast, ViTImageProcessor, VisionEncoderDecoderModel
from PIL import Image
import os
import numpy as np

from keras.applications.vgg16 import VGG16
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input

from pickle import load
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model
from keras.models import Model


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

# -----------------------------------
def extract_features(filename):
    model = VGG16()
    model.layers.pop()
    model = Model(inputs=model.inputs, outputs=model.layers[-1].output)
    image = load_img(filename, target_size=(224, 224))
    image = img_to_array(image)
    image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
    image = preprocess_input(image)
    feature = model.predict(image, verbose=0)
    return feature

def word_for_id(integer, tokenizer):
    for word, index in tokenizer.word_index.items():
        if index == integer:
            return word
    return None

def generate_desc(model, tokenizer, photo, max_length):
    in_text = 'startseq'
    for i in range(max_length):
        sequence = tokenizer.texts_to_sequences([in_text])[0]
        sequence = pad_sequences([sequence], maxlen=max_length)
        yhat = model.predict([photo,sequence], verbose=0)
        yhat = np.argmax(yhat)
        word = word_for_id(yhat, tokenizer)
        if word is None:
            break
        in_text += ' ' + word
        if word == 'endseq':
            break
    return in_text

tokenizer = load(open(r'C:\Users\Dell\OneDrive\Desktop\datamining-image-caption-generate\model\tokenizer.pkl', 'rb'))
max_length = 34
model_file = r'C:\Users\Dell\OneDrive\Desktop\datamining-image-caption-generate\model\model.h5'
model = load_model(model_file)

def predict_caption(image):
    try:
        photo = extract_features(image)
        caption = generate_desc(model, tokenizer, photo, max_length)
        return caption
    except Exception as e:
        print(f"An error occurred: {e}")
        return "This image is not supported!"

# -----------------------------------

# def predict_caption(image):
#     try:
#         img = Image.open(image)

#         model = VisionEncoderDecoderModel.from_pretrained(
#             "nlpconnect/vit-gpt2-image-captioning")
#         image_processor = ViTImageProcessor.from_pretrained(
#             "nlpconnect/vit-gpt2-image-captioning")
#         tokenizer = GPT2TokenizerFast.from_pretrained(
#             "nlpconnect/vit-gpt2-image-captioning")

#         pixel_values = image_processor(img, return_tensors="pt").pixel_values
#         generated_ids = model.generate(pixel_values, max_new_tokens=30)
#         caption = tokenizer.batch_decode(
#             generated_ids, skip_special_tokens=True)[0]

#         return caption
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return "This image is not supported!"


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
