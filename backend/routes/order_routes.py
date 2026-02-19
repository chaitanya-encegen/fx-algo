from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.order import Order
from models.order_item import OrderItem
from models.product import Product

order_bp = Blueprint("orders", __name__)

@order_bp.post("/")
@jwt_required()
def create_order():

    user_id = get_jwt_identity()
    data = request.json

    items = data.get("items", [])
    billing = data.get("billing")

    if not items:
        return {"error": "No items provided"}, 400

    # CREATE ORDER FIRST
    order = Order(
        user_id=user_id,
        payment_method=data.get("payment_method"),

        first_name=billing.get("first_name"),
        last_name=billing.get("last_name"),
        email=billing.get("email"),
        phone=billing.get("phone"),
        country=billing.get("country"),
        address=billing.get("address"),
        postal_code=billing.get("postal_code"),
        coupon_code=billing.get("coupon")
    )

    db.session.add(order)
    db.session.flush()

    total = 0

    # ADD ITEMS
    for item in items:
        product = Product.query.get(item["product_id"])
        if not product:
            continue

        qty = int(item.get("quantity", 1))
        price = float(product.price)

        total += price * qty

        order_item = OrderItem(
            order_id=order.id
,
            product_id=product.id,
            quantity=qty,
            price=price
        )
        db.session.add(order_item)

    order.total_amount = total
    db.session.commit()

    return {"order_id": order.id, "amount": total}
