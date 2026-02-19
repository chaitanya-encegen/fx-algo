from extensions import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)

    price = db.Column(db.Float, nullable=False)
    old_price = db.Column(db.Float, default=0)
    discount = db.Column(db.Integer, default=0)

    image = db.Column(db.String(300))
    file_url = db.Column(db.String(300))   # VERY IMPORTANT
