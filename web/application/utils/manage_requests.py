from flask import Blueprint, request, redirect, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId

bp = Blueprint('manage_requests', __name__)


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


@bp.route('/delete_request', methods=['GET', 'POST'])
def delete_request():
    request_id = ''
    if 'data' in request.form:
        request_id = ObjectId(request.form['data'])
    client = MongoClient('mongodb://db:27017/')
    db = client['db']
    db.upload_requests.delete_one({'_id': request_id})

    return {}
