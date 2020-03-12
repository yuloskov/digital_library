import os

from flask import Flask, redirect, url_for
from flask_login import LoginManager, UserMixin

def redirect_to_login():
    return redirect(url_for('auth.login'))


def create_app(config=None):
    app = Flask(__name__)
    app.config.from_mapping(
        TEMPLATES_AUTO_RELOAD=True,
        # TODO replace with env variable
        SECRET_KEY='secret',
        UPLOAD_PATH='/var/img',
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

    # Register all blueprints to the app
    from application.views import auth

    app.register_blueprint(auth.bp)

    return app
