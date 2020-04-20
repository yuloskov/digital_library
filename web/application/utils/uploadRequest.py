from flask import Blueprint, request, redirect, url_for
from pymongo import MongoClient

bp = Blueprint('uploadRequest', __name__)

@bp.route('/uploadRequest', methods=['GET', 'POST'])
def uploadRequest():
    title=request.form['title']
    description=request.form['description']
    data={"title":title,"description":description}
    client = MongoClient('mongodb://db:27017/')
    db = client['db']
    db.uploadRequests.insert_one(data)
    return redirect(url_for('download.download'))
