from extensions import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)

    # user
    user_id = db.Column(db.Integer, nullable=False)

    # money
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default="pending")
    payment_method = db.Column(db.String(20))

    # billing details
    first_name = db.Column(db.String(120))
    last_name = db.Column(db.String(120))
    email = db.Column(db.String(150))
    phone = db.Column(db.String(20))
    country = db.Column(db.String(50))
    address = db.Column(db.Text)
    postal_code = db.Column(db.String(20))
    coupon_code = db.Column(db.String(50))

    # razorpay
    razorpay_order_id = db.Column(db.String(200))
    razorpay_payment_id = db.Column(db.String(200))
    razorpay_signature = db.Column(db.String(200))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
