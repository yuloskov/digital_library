import os

from flask import app, request, redirect, url_for, current_app, send_from_directory
from werkzeug.utils import secure_filename

@app.route('/uploads/<path:filename>', methods=['GET', 'POST'])
def download(filename):
    uploads = os.path.join(current_app.root_path, app.config['UPLOAD_FOLDER'])
    return send_from_directory(directory=uploads, filename=filename)