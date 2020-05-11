from application.db_manager import DbManager
from flask import Blueprint, request, redirect, url_for

bp = Blueprint('request', __name__)


@bp.route('/upload_request', methods=['GET', 'POST'])
def upload_request():
    db_manager = DbManager.Manager()
    title = ''

    if 'title' in request.form:
        title = request.form['title']

    db_manager.upload_request(title)
    return redirect(url_for('store.download'))


@bp.route('/delete_request', methods=['GET', 'POST'])
def delete_request():
    db_manager = DbManager.Manager()

    request_id = ''
    if 'data' in request.form:
        request_id = request.form['data']

    db_manager.delete_request(request_id)
    return {}
