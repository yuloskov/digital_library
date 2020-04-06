import os

from flask import request, app, redirect, url_for, Blueprint
from pymongo import MongoClient

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


bp = Blueprint('upload', __name__)


@bp.route('/upload', methods=['GET', 'POST'])
def upload_file():
    filename = request.files['file'].filename
    title = request.form['title']
    file = request.files['file']
    data = {"title": title,
            "filename": request.files['file'].filename}
    client = MongoClient('mongodb://db:27017/')
    db = client['db']
    db.books.insert_one(data)
    folder = '/var/books'
    file.save(os.path.join(folder, filename))
    return redirect(url_for('download.download'))
