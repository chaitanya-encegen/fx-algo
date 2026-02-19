from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db

from models.user import User
from models.order import Order
from models.product import Product
from models.license import License

admin_bp = Blueprint("admin", __name__)

# ---------------- ADMIN CHECK ----------------
def admin_only():
    user_id = get_jwt_identity()

    if user_id is None:
        return False

    user = User.query.get(user_id)

    if user is None:
        return False

    return user.role == "superadmin"



# ---------------- DASHBOARD STATS ----------------
@admin_bp.get("/stats")
@jwt_required()
def admin_stats():

    if not admin_only():
        return {"error": "Admin only"}, 403

    total_products = Product.query.count()
    total_users = User.query.count()
    total_orders = Order.query.filter_by(status="paid").count()

    revenue = db.session.query(db.func.sum(Order.amount)).filter_by(status="paid").scalar()
    revenue = revenue or 0

    return {
        "products": total_products,
        "users": total_users,
        "orders": total_orders,
        "revenue": revenue
    }


# ---------------- ALL USERS ----------------
@admin_bp.get("/users")
@jwt_required()
def get_users():

    if not admin_only():
        return {"error": "Admin only"}, 403

    users = User.query.all()
    result = []

    for u in users:
        paid_orders = Order.query.filter_by(user_id=u.id, status="paid").all()
        order_count = len(paid_orders)
        total_spent = sum([o.amount for o in paid_orders]) if paid_orders else 0

        result.append({
            "id": u.id,
            "email": u.email,
            "orders": order_count,
            "spent": total_spent
        })

    return result


# ---------------- SINGLE USER DETAIL ----------------
@admin_bp.get("/users/<int:user_id>")
@jwt_required()
def user_detail(user_id):

    if not admin_only():
        return {"error": "Admin only"}, 403

    user = User.query.get_or_404(user_id)

    orders = Order.query.filter_by(user_id=user_id).all()
    licenses = License.query.filter_by(user_id=user_id).all()

    order_data = []
    for o in orders:
        product = Product.query.get(o.product_id)

        order_data.append({
            "order_id": o.id,
            "product": product.title if product else "Deleted Product",
            "amount": o.amount,
            "status": o.status,
            "date": str(o.created_at)
        })

    license_data = []
    for l in licenses:
        product = Product.query.get(l.product_id)

        license_data.append({
            "product": product.title if product else "Deleted Product",
            "key": l.license_key,
            "active": l.active
        })

    return {
        "email": user.email,
        "orders": order_data,
        "licenses": license_data
    }
