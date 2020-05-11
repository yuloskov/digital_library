import os
from flask import (
    Blueprint,
    request,
    redirect,
    url_for,
    render_template,
)
from flask_login import login_required

from application.db_manager import DbManager

bp = Blueprint('store', __name__)


@bp.route('/download', methods=['GET', 'POST'])
@login_required
def download():
    db_manager = DbManager.Manager()
    books = db_manager.get_list_of_books()
    requests = db_manager.get_requests()
    return render_template(
        'download.html',
        books=books,
        requests=requests,
    )


@bp.route('/upload', methods=['GET', 'POST'])
def upload_file():
    db_manager = DbManager.Manager()

    filename = ''
    file_book = ''
    title = ''
    file_picture = ''
    file_picture_name = ''
    description = ''
    subject_tag = ''
    course_tag1 = ''
    course_tag2 = ''
    course_tag3 = ''

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

    if 'course_tag1' in request.form:
        course_tag1 = request.form['course_tag1']

    if 'course_tag2' in request.form:
        course_tag2 = request.form['course_tag2']

    if 'course_tag3' in request.form:
        course_tag3 = request.form['course_tag3']

    data = {
        'title': title,
        'description': description,
        'filename': filename,
        'img': file_picture_name,
        'subject_tag': subject_tag,
        'course_tag1': course_tag1,
        'course_tag2': course_tag2,
        'course_tag3': course_tag3,
        'approved': 'false',
    }

    db_manager.insert_book(data)

    books_folder = '/var/books'

    covers_dir_name = 'covers'
    images_folder = os.path.join(books_folder, covers_dir_name)

    if not os.path.exists(images_folder):
        os.mkdir(images_folder)
        print(f'Directory {images_folder} Created ')
    else:
        print(f'Directory {images_folder} already exists')

    file_picture.save(os.path.join(images_folder, file_picture_name))

    file_book.save(os.path.join(books_folder, filename))
    return redirect(url_for('store.download'))
