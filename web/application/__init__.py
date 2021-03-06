import os

from application.db_manager import DbManager

from flask_login import LoginManager, UserMixin
from flask import Flask, redirect, url_for


def redirect_to_login():
    return redirect(url_for('auth.login'))


def create_app(config=None):
    app = Flask(__name__)
    app.config.from_mapping(
        TEMPLATES_AUTO_RELOAD=True,
        # TODO replace with env variable
        SECRET_KEY='secret',
        BOOK_PATH='/var/books',
        # Database variables
        DATABASE_URL=os.environ['DATABASE_URL'],
        DATABASE_NAME=None,
    )

    if config is not None:
        app.config.update(config)

    login_manager = LoginManager()
    login_manager.unauthorized_handler(redirect_to_login)
    login_manager.init_app(app)

    @app.route('/')
    def default():
        return redirect('/login')

    @login_manager.user_loader
    def user_loader(login):
        db_manager = DbManager.Manager()
        if db_manager.get_user(login) is None:
            return
        user = UserMixin()
        user.id = login
        return user

    # Register all blueprints to the app
    from application.views import (
        auth,
        article,
        request,
        store,
        approve,
    )

    app.register_blueprint(auth.bp)
    app.register_blueprint(article.bp)
    app.register_blueprint(request.bp)
    app.register_blueprint(store.bp)
    app.register_blueprint(approve.bp)

    return app
