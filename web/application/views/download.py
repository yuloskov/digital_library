from flask import (
    Blueprint,
    request,
    redirect,
    url_for,
    render_template,
)


@bp.route('/download', methods=['GET', 'POST'])
def download():
    return render_template(
        'download.html',
        message='Incorrect login or password',
    )