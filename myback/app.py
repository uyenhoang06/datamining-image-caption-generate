from flask import request, Flask, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = 'E:/Image-Generator_Web/myback/static/uploads/'

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

# Import thư viện để gọi hàm dự đoán caption


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def predict_caption(index):
    caption = "Caption" *(index + 2) + \
        str(index)
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

    for i in range(0, len(files)):
        file = files[i]
        print(file)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(path)

            caption = predict_caption(i)
            captions.append(caption)



    resp = jsonify({
        "captions": captions,
        "status": 'success',
    })
    resp.status_code = 201
    return resp


if __name__ == "__main__":
    app.run(debug=True)
