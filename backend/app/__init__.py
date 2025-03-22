from flask import Flask

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object('config.Config')

    # Register routes
    from .routes import api
    app.register_blueprint(api)

    return app