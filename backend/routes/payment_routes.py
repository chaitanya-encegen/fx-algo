import razorpay
from flask import Blueprint, request, jsonify
from config import Config

payment_bp = Blueprint("payment", __name__)

client = razorpay.Client(
    auth=(Config.RAZORPAY_KEY_ID, Config.RAZORPAY_KEY_SECRET)
)

# CREATE RAZORPAY ORDER
@payment_bp.post("/create-order")
def create_order():

    data = request.json
    order_id = data.get("order_id")
    amount = int(data.get("amount"))

    # create razorpay order
    razorpay_order = client.order.create({
        "amount": amount,
        "currency": "INR",
        "payment_capture": 1,
        "notes": {
            "order_id": order_id
        }
    })

    # SAVE RAZORPAY ORDER ID
    from models.order import Order
    from extensions import db

    order = Order.query.get(order_id)
    order.razorpay_order_id = razorpay_order["id"]
    db.session.commit()

    return jsonify({
        "key": Config.RAZORPAY_KEY_ID,
        "razorpay_order_id": razorpay_order["id"],
        "amount": razorpay_order["amount"]
    })

import hmac
import hashlib
from extensions import db
from models.order import Order

@payment_bp.post("/verify")
def verify_payment():

    data = request.json

    order_id = data["order_id"]
    razorpay_order_id = data["razorpay_order_id"]
    razorpay_payment_id = data["razorpay_payment_id"]
    razorpay_signature = data["razorpay_signature"]

    generated_signature = hmac.new(
        bytes(Config.RAZORPAY_KEY_SECRET, 'utf-8'),
        bytes(razorpay_order_id + "|" + razorpay_payment_id, 'utf-8'),
        hashlib.sha256
    ).hexdigest()

    if generated_signature != razorpay_signature:
        return {"error": "Invalid payment"}, 400

    order = Order.query.get(order_id)
    order.status = "paid"
    order.razorpay_payment_id = razorpay_payment_id
    order.razorpay_signature = razorpay_signature

    db.session.commit()

    return {"message": "Payment verified"}