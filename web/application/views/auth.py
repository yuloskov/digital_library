from flask import (
    Blueprint,
    request,
    redirect,
    url_for,
    render_template,
)


bp = Blueprint('auth', __name__)


@bp.route('/login', methods=['GET', 'POST'])
def login():

    return render_template(
        'login.html',
    )

