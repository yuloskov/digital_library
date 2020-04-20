from flask import app, request, redirect, url_for, current_app, send_from_directory, Blueprint

bp = Blueprint('download_file', __name__)


@bp.route('/download_file/<path:filename>', methods=['GET', 'POST'])
def download(filename):
    print(type(send_from_directory(filename=filename)))
    return send_from_directory(filename=filename)
