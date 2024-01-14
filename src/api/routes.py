"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from bcrypt import gensalt
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/users', methods=['POST'])
def handle_user():
    if request.method == 'POST':
        data = request.json
        verify_data = [data.get("email"), data.get("password"), data.get("name")]
        if None in verify_data:
            return jsonify({"message": "All parameters are required"}), 400
        user_exist = User.query.filter_by(email=data.get("email")).one_or_none()
        if user_exist:
            return jsonify({"message": "User already exists"}), 400
        pepper = str(gensalt(), encoding='utf-8')
        print(pepper)
        password_pepper = data.get("password")+pepper
        password_hashed = str(generate_password_hash(password_pepper), encoding='utf-8')
        print(password_hashed)
        new_user = User(name=data.get("name"), email=data.get("email"), password_hashed=password_hashed, pepper=pepper)
        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"message": "POST request received"}), 201
        except Exception as error:
            db.session.rollback()
            print(error)
            return jsonify({"message": "Server error"}), 500

@api.route('/token', methods=['POST'])
def singup ():
    if request.method == 'POST':
        data = request.json
        user_exist = User.query.filter_by(email=data.get("email")).one_or_none()
        if user_exist is None:
            return jsonify({"message":"User not exist"}), 400
        password = data.get("password") + user_exist.pepper
        hash_password = user_exist.password_hashed
        validation_password = check_password_hash(hash_password, password)
        print(validation_password)
        if validation_password:
            token = create_access_token(identity= user_exist.id)        
            return jsonify({"message":"Authentication successful",
                            "token": token}), 201
        else:
            return jsonify({"message":"Incorrect Pasword"}), 401

@api.route("/protected", methods=["GET"])
@jwt_required()
def user_info():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    return jsonify(user.serialize()), 200

    

    

