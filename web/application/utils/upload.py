import os

from flask import request, app, redirect, url_for, Blueprint
from pymongo import MongoClient
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

bp = Blueprint('upload', __name__)

# #@bp.route('/upload', methods=['GET', 'POST'])
# #def upload_file():
#     if request.method == 'POST':
#         print(request.form["title"])
#         print(request.form["file"])
#         print(request.files)
#         file = request.files['file']
#         if file and allowed_file(file.filename):
#             filename = secure_filename(file.filename)
#             file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#             return redirect(url_for('upload',
#                                     filename=filename))
@bp.route('/upload', methods=['GET', 'POST'])
def upload_file():
    filename=request.form['title']
    file = request.files['file']
    data={"title":request.form['title'],"filename":request.files['file'].filename}
    client = MongoClient('mongodb://db:27017/')
    db = client['db']
    db.posts.insert_one(data)
    file.save(filename)
    return redirect(url_for('download.download'))