from flask import Blueprint, request, redirect, url_for
from pymongo import MongoClient

bp = Blueprint('upload_request', __name__)


@bp.route('/upload_request', methods=['GET', 'POST'])
def upload_request():
    title = ''

    if 'title' in request.form:
        title = request.form['title']

    data = {"title": title}
    client = MongoClient('mongodb://db:27017/')
    db = client['db']
    db.upload_requests.insert_one(data)
    return redirect(url_for('download.download'))
