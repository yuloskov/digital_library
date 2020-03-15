from flask import (
    Blueprint,
    request,
    redirect,
    url_for,
    render_template,
)

from application.utils import DbManager


from flask_login import (
    UserMixin,
    login_required,
    current_user,
    login_user,
    logout_user,
)


bp = Blueprint('auth', __name__)


@bp.route('/login', methods=['GET', 'POST'])
def login():
    db_manager = DbManager.Manager()

    if current_user.is_authenticated:
        return redirect(url_for('download.download'))

    if request.method == 'GET':
        return render_template('login.html')

    login = request.form['login']
    # user_password = db_manager.get_admins_password(login)
    #
    # if user_password is None:
    #     return render_template(
    #         'login.html',
    #         message='Incorrect login or password',
    #     )

    match = db_manager.check_validity(
        login,
        request.form['password']
    )
    if match:
        user = UserMixin()
        user.id = login
        login_user(user)
        return redirect(url_for('download.download'))

    return render_template(
        'login.html',
    )

