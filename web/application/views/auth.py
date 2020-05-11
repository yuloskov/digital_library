from flask import (
    Blueprint,
    request,
    redirect,
    url_for,
    render_template,
)

from flask_login import (
    UserMixin,
    login_required,
    current_user,
    login_user,
    logout_user,
)
from application.db_manager import DbManager

bp = Blueprint('auth', __name__)


@bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@bp.route('/login', methods=['GET', 'POST'])
def login():
    db_manager = DbManager.Manager()

    if current_user.is_authenticated:
        return redirect(url_for('store.download'))

    if request.method == 'GET':
        return render_template('login.html')

    login = request.form['login']

    match = db_manager.check_validity(
        login,
        request.form['password']
    )
    if match:
        user = UserMixin()
        user.id = login
        login_user(user)
        return redirect(url_for('store.download'))

    return render_template(
        'login.html',
    )
