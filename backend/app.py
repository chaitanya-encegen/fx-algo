from flask import Flask, send_from_directory, request
from config import Config
from extensions import db, jwt
from flask_cors import CORS
import os

# Blueprints
from routes.auth_routes import auth_bp
from routes.product_routes import product_bp
from routes.order_routes import order_bp
from routes.license_routes import license_bp
from routes.payment_routes import payment_bp
from routes.site_settings_routes import settings_bp
from routes.testimonial_routes import testimonial_bp
from routes.admin_routes import admin_bp

# IMPORTANT: import model so tables create
from models.site_setting import SiteSetting

# ------------------ CREATE APP ------------------

# React build will be served from /static
app = Flask(__name__, static_folder="static", static_url_path="")
app.config.from_object(Config)

# Prevent trailing slash redirect issues
app.url_map.strict_slashes = False

# No longer localhost frontend → same origin
CORS(
    app,
    resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# ------------------ INIT EXTENSIONS ------------------

db.init_app(app)
jwt.init_app(app)

# ------------------ REGISTER API ROUTES ------------------

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(product_bp, url_prefix="/api/products")
app.register_blueprint(order_bp, url_prefix="/api/orders")
app.register_blueprint(license_bp, url_prefix="/api/licenses")
app.register_blueprint(payment_bp, url_prefix="/api/payment")
app.register_blueprint(admin_bp, url_prefix="/api/admin")

app.register_blueprint(testimonial_bp)
app.register_blueprint(settings_bp)

# ------------------ SERVE UPLOAD FILES ------------------

UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# ------------------ SERVE REACT FRONTEND ------------------

# Homepage
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

# SPA fallback for React Router
@app.errorhandler(404)
def not_found(e):

    # Allow real API errors
    if request.path.startswith("/api/"):
        return {"error": "API endpoint not found"}, 404

    # Allow real missing upload files
    if request.path.startswith("/uploads/"):
        return {"error": "File not found"}, 404

    # Otherwise return React app
    return send_from_directory(app.static_folder, "index.html")

# ------------------ RUN SERVER (PRODUCTION) ------------------

from waitress import serve

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    print("Server running on http://127.0.0.1:5000")
    serve(app, host="0.0.0.0", port=5000)
