from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager

login = LoginManager()
db = SQLAlchemy()

class UserModel(UserMixin, db.Model):
    __tablename__ = 'users'
 
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True)
    firstName = db.Column(db.String(100))
    lastName = db.Column(db.String(100))
    password_hash = db.Column(db.String())
 
    def set_password(self,password):
        self.password_hash = generate_password_hash(password)
     
    def check_password(self,password):
        return check_password_hash(self.password_hash,password)

    def return_id(self, id):
        return id

class JobModel(db.Model):
    __tablename__ = 'jobs'

    jid = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.String(80), nullable=True)
    jobtype = db.Column(db.String(80), nullable=False)

    uid = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

class StampCatalogImageModel(db.Model):
    __tablename__ = 'stampCatalogImageinfo'

    scid = db.Column(db.Integer, primary_key=True)
    stamp_title = db.Column(db.String(80), nullable=True)
    stamp_country = db.Column(db.String(80), nullable=True)
    stamp_year = db.Column(db.Integer, nullable=True)
    stamp_number = db.Column(db.String(80), nullable=True)
    stamp_face_value = db.Column(db.String(80), nullable=True)
    stamp_info = db.Column(db.String(200), nullable=True)
    catalog_name = db.Column(db.String(80), nullable=True)
    catalog_number = db.Column(db.Integer, nullable=True)
    catalog_year = db.Column(db.Integer, nullable=True)
    catalog_price = db.Column(db.Float, nullable=True)
    catalog_scott_number = db.Column(db.Integer, nullable=True)
    catalog_verient_number = db.Column(db.Integer, nullable=True)
    image_name = db.Column(db.String(80), nullable=True)
    image_type = db.Column(db.String(80), nullable=True)
    uid = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

# class CatalogModel(db.Model):
#     __tablename__ = 'cataloginfo'

#     cid = db.Column(db.Integer, primary_key=True)
#     catalog_name = db.Column(db.String(80), nullable=True)
#     catalog_number = db.Column(db.Integer, nullable=True)
#     catalog_year = db.Column(db.Integer, nullable=True)
#     catalog_price = db.Column(db.Float, nullable=True)
#     catalog_scott_number = db.Column(db.Integer, nullable=True)
#     catalog_verient_number = db.Column(db.Integer, nullable=True)

#     iid = db.Column(db.Integer, db.ForeignKey('images.iid'), nullable=False)
#     uid = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

# class ImageModel(db.Model):
#     __tablename__ = 'images'

#     iid = db.Column(db.Integer, primary_key=True)
#     image_name = db.Column(db.String(80), nullable=True)
#     image_type = db.Column(db.String(80), nullable=True)
 
@login.user_loader
def load_user(id):
    return UserModel.query.get(int(id))