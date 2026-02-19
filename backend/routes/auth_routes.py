from flask import Blueprint, request
from extensions import db
from models.user import User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity


auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register():
    data = request.json

    existing = User.query.filter_by(email=data["email"]).first()
    if existing:
        return {"error": "Email already registered"}, 400

    user = User(
    email=data["email"],
    role="user"  # prevents admin creation
)

    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return {"msg": "registered"}

@auth_bp.post("/login")
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not user.check_password(data["password"]):
        return {"error": "Invalid credentials"}, 401

    token = create_access_token(identity=str(user.id))

    return {"token": token, "role": user.role}

@auth_bp.get("/me")
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user:
        return {"error": "User not found"}, 404

    return {
        "id": user.id,
        "email": user.email,
        "role": user.role
    }
