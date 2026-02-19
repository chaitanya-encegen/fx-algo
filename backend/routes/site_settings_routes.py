from flask import Blueprint, request, jsonify
from extensions import db
from models.site_setting import SiteSetting
from utils.admin_required import admin_required


settings_bp = Blueprint("settings", __name__, url_prefix="/api/settings")


# ---------------- PUBLIC (Navbar reads this) ----------------

@settings_bp.route("/announcement", methods=["GET"])
def get_announcement():
    setting = SiteSetting.query.first()

    # create default row automatically
    if setting is None:
        setting = SiteSetting(announcement="✨ Welcome to FX Algo")
        db.session.add(setting)
        db.session.commit()

    return jsonify({"announcement": setting.announcement})


# ---------------- ADMIN UPDATE ----------------

@settings_bp.route("/announcement", methods=["PUT"])
@admin_required
def update_announcement():
    data = request.get_json()

    setting = SiteSetting.query.first()

    if setting is None:
        setting = SiteSetting()

    setting.announcement = data.get("announcement", "")
    db.session.add(setting)
    db.session.commit()

    return jsonify({"message": "Announcement updated"})
