from app import app
from extensions import db
from models.user import User

with app.app_context():

    email = "admin@fxstore.com"
    password = "admin123"

    existing = User.query.filter_by(email=email).first()
    if existing:
        print("Admin already exists")
    else:
        admin = User(email=email, role="superadmin")
        admin.set_password(password)

        db.session.add(admin)
        db.session.commit()

        print("Super admin created!")
        print("Email:", email)
        print("Password:", password)