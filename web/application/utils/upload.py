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
    filename = ''
    file_book = ''
    title = ''
    file_picture = ''
    file_picture_name = ''
    description = ''
    subject_tag = ''
    course_tag = ''

    if 'file' in request.files:
        filename = request.files['file'].filename
        file_book = request.files['file']

    if 'title' in request.form:
        title = request.form['title']

    if 'file_picture' in request.files:
        file_picture = request.files['file_picture']
        file_picture_name = file_picture.filename

    if 'description' in request.form:
        description = request.form['description']

    if 'subject_tag' in request.form:
        subject_tag = request.form['subject_tag']

    if 'course_tag' in request.form:
        course_tag = request.form['course_tag']

    data = {
        "title": title,
        "description": description,
        "filename": filename,
        "img": file_picture_name,
        "subject_tag": subject_tag,
        "course_tag": course_tag,
        "approved": "false",
    }

    client = MongoClient('mongodb://db:27017/')
    db = client['db']
    db.books.insert_one(data)

    folder_books = '/var/books'

    dir_name = 'covers'
    folder_images = os.path.join(folder_books, dir_name)

    if not os.path.exists(folder_images):
        os.mkdir(folder_images)
        print("Directory ", folder_images, " Created ")
    else:
        print("Directory ", folder_images, " already exists")

    file_picture.save(os.path.join(folder_images, file_picture_name))

    file_book.save(os.path.join(folder_books, filename))
    return redirect(url_for('download.download'))
