import random, string
from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.order import Order
from models.order_item import OrderItem
from models.license import License
from models.product import Product

license_bp = Blueprint("licenses", __name__)

# 🔑 license key generator
def generate_key():
    return "FX-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=12))


# 🔥 ACTIVATE ORDER (called after payment success)
@license_bp.post("/activate/<int:order_id>")
def activate(order_id):

    order = Order.query.get(order_id)

    if not order:
        return {"error": "Order not found"}, 404

    # mark order paid
    order.status = "paid"

    # get all purchased items
    items = OrderItem.query.filter_by(order_id=order.id).all()

    created_licenses = []

    for item in items:
        key = generate_key()

        lic = License(
            user_id=order.user_id,
            product_id=item.product_id,
            license_key=key
        )

        db.session.add(lic)
        created_licenses.append(key)

    db.session.commit()

    return {"licenses": created_licenses}


# 🔥 USER PURCHASES
@license_bp.get("/my")
@jwt_required()
def my_licenses():

    user_id = get_jwt_identity()

    licenses = License.query.filter_by(user_id=user_id).all()

    response = []

    for l in licenses:
        product = Product.query.get(l.product_id)

        response.append({
            "license_key": l.license_key,
            "status": "active" if l.active else "disabled",
            "product": {
                "id": product.id,
                "title": product.title,
                "image": product.image,
                "file_url": product.file_url
            }
        })

    return response
