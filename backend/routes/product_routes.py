from flask import Blueprint, request
from extensions import db
from models.product import Product
from utils.admin_required import admin_required

import os
from werkzeug.utils import secure_filename

product_bp = Blueprint("products", __name__)

# ---------------------------
# PUBLIC ROUTES (CUSTOMERS)
# ---------------------------

# GET ALL PRODUCTS (Homepage)
@product_bp.get("/")
def all_products():
    products = Product.query.all()

    return [
        {
            "id": p.id,
            "title": p.title,
            "price": p.price,
            "image": p.image,
            "discount": p.discount,
            "old_price": p.old_price
        } for p in products
    ]


# GET SINGLE PRODUCT (Product Detail Page)
@product_bp.get("/<int:id>")
def single_product(id):
    p = Product.query.get_or_404(id)

    return {
        "id": p.id,
        "title": p.title,
        "description": p.description,
        "price": p.price,
        "old_price": p.old_price,
        "discount": p.discount,
        "image": p.image,
        "file_url": p.file_url
    }


# ---------------------------
# ADMIN ROUTES (SUPERADMIN ONLY)
# ---------------------------

# CREATE PRODUCT
@product_bp.post("/")
@admin_required
def add_product():

    title = request.form.get("title")
    description = request.form.get("description")
    price = request.form.get("price")
    discount = request.form.get("discount", 0)
    old_price = request.form.get("old_price", 0)

    # Create upload folders if not exist
    os.makedirs("uploads/images", exist_ok=True)
    os.makedirs("uploads/files", exist_ok=True)

    # ---------------- IMAGE UPLOAD ----------------
    image_file = request.files.get("image")
    image_path = None

    if image_file:
        filename = secure_filename(image_file.filename)
        image_save_path = os.path.join("uploads/images", filename)
        image_file.save(image_save_path)
        image_path = "/" + image_save_path.replace("\\", "/")

    # ---------------- BOT FILE UPLOAD ----------------
    bot_file = request.files.get("file")
    file_path = None

    if bot_file:
        filename = secure_filename(bot_file.filename)
        file_save_path = os.path.join("uploads/files", filename)
        bot_file.save(file_save_path)
        file_path = "/" + file_save_path.replace("\\", "/")

    # Create product
    product = Product(
        title=title,
        description=description,
        price=float(price),
        discount=int(discount),
        old_price=float(old_price),
        image=image_path,
        file_url=file_path
    )

    db.session.add(product)
    db.session.commit()

    return {"message": "Product created successfully", "id": product.id}


# DELETE PRODUCT
@product_bp.delete("/<int:id>")
@admin_required
def delete_product(id):

    product = Product.query.get_or_404(id)

    db.session.delete(product)
    db.session.commit()

    return {"message": "Product deleted"}

