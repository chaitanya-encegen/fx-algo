from extensions import db

class SiteSetting(db.Model):
    __tablename__ = "site_settings"

    id = db.Column(db.Integer, primary_key=True)
    announcement = db.Column(
        db.String(255),
        default="✨ Welcome to FX Algo — Best Trading Bots"
    )
