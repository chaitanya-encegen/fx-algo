from extensions import db

class Testimonial(db.Model):
    __tablename__ = "testimonials"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100))
    country = db.Column(db.String(50))
    flag = db.Column(db.String(10))
    reward = db.Column(db.String(50))
    role = db.Column(db.String(100))

    video = db.Column(db.String(255))  # video path
