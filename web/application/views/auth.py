from flask import (
    Blueprint,
    request,
    redirect,
    url_for,
    render_template,
)
import flask_login
from application.utils import DbManager

bp = Blueprint('auth', __name__)


@bp.route('/login', methods=['GET', 'POST'])
def login():
    #DbManager.Manager.connect(self=DbManager.Manager)
    #DbManager.Manager.insert_user(self=DbManager.Manager,login='login',password="password")
    #print(DbManager.Manager.check_validity(self=DbManager.Manager,login='login',password='password'))
    return render_template(
        'login.html',
    )

