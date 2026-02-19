from flask import Blueprint, request, jsonify
from extensions import db
from models.testimonial import Testimonial
from utils.admin_required import admin_required
import os
from werkzeug.utils import secure_filename

testimonial_bp = Blueprint("testimonials", __name__, url_prefix="/api/testimonials")

UPLOAD_FOLDER = "uploads/videos"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# -------------------- READ (PUBLIC) --------------------
@testimonial_bp.route("/", methods=["GET"])
def get_testimonials():
    items = Testimonial.query.order_by(Testimonial.id.desc()).all()

    data = []
    for t in items:
        data.append({
            "id": t.id,
            "name": t.name,
            "country": t.country,
            "flag": t.flag,
            "reward": t.reward,
            "role": t.role,
            "video": f"/{t.video}"
        })

    return jsonify(data)


# -------------------- CREATE (ADMIN) --------------------
@testimonial_bp.route("/", methods=["POST"])
@admin_required
def add_testimonial():

    file = request.files.get("video")

    if not file:
        return jsonify({"error": "Video required"}), 400

    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    t = Testimonial(
        name=request.form.get("name"),
        country=request.form.get("country"),
        flag=request.form.get("flag"),
        reward=request.form.get("reward"),
        role=request.form.get("role"),
        video=path
    )

    db.session.add(t)
    db.session.commit()

    return jsonify({"message": "Testimonial added"})


# -------------------- UPDATE (ADMIN) --------------------
@testimonial_bp.route("/<int:id>", methods=["PUT"])
@admin_required
def update_testimonial(id):

    t = Testimonial.query.get_or_404(id)

    t.name = request.form.get("name")
    t.country = request.form.get("country")
    t.flag = request.form.get("flag")
    t.reward = request.form.get("reward")
    t.role = request.form.get("role")

    file = request.files.get("video")
    if file:
        # delete old video
        if t.video and os.path.exists(t.video):
            os.remove(t.video)

        filename = secure_filename(file.filename)
        path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(path)
        t.video = path

    db.session.commit()
    return jsonify({"message": "Updated"})


# -------------------- DELETE (ADMIN) --------------------
@testimonial_bp.route("/<int:id>", methods=["DELETE"])
@admin_required
def delete_testimonial(id):

    t = Testimonial.query.get_or_404(id)

    # remove video file
    if t.video and os.path.exists(t.video):
        os.remove(t.video)

    db.session.delete(t)
    db.session.commit()

    return jsonify({"message": "Deleted"})
