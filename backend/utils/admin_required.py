from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from flask import request
from models.user import User

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):

        # Allow preflight requests (VERY IMPORTANT)
        if request.method == "OPTIONS":
            return {"ok": True}, 200

        verify_jwt_in_request()

        user_id = get_jwt_identity()

        # do NOT cast to int
        user = User.query.get(user_id)

        if user is None or user.role != "superadmin":
            return {"error": "Admin access required"}, 403

        return fn(*args, **kwargs)

    return wrapper
