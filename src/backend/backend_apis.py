from flask import Flask, request, jsonify
from flask import Flask,render_template,request,redirect
from flask_login import login_required, current_user, login_user, logout_user
from models import UserModel,db,login, JobModel, StampCatalogImageModel
# import requests
import time
import cv2
import numpy as np
from elasticsearch import Elasticsearch
import lib_file
import base64

app = Flask(__name__)
app.secret_key = 'xyz'
DIR_FOR_IMAGES = '/home/jawad/Desktop/StampSearchEngine/src/backend/ImagesFromUser/'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stampSearchEngine.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

es = Elasticsearch([{'host':'localhost','port':9200}])
ses = lib_file.SignatureES(es)
 
db.init_app(app)
login.init_app(app)
login.login_view = 'login'

@app.before_first_request
def create_all():
    db.create_all()

@app.route('/checkAuth' ,methods=['GET'])
def checkAuth():
    if current_user.is_authenticated:
        return {'return': 'already authenticated'}
    else:
        return {'return': 'not authenticated'}

@app.route('/register', methods=['POST'])
def register():

    if request.method == 'POST':

        data = request.get_json()

        email = data['email']
        firstName = data['firstName']
        lastName = data['lastName']
        password = data['password']

        if UserModel.query.filter_by(email=email).first():
            return {'return':'email already present'}

        user = UserModel(email=email, firstName=firstName, lastName=lastName)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        uid = user.id

        dtime = time.asctime(time.localtime(time.time()))

        job = JobModel(datetime=str(dtime), jobtype='Register', uid=uid)
        db.session.add(job)
        db.session.commit()

        return {'return': 'registered'}

@app.route('/login', methods = ['POST'])
def login():
    if current_user.is_authenticated:
        return {'return': 'already authenticated'}
    
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        password = data['password']

        user = UserModel.query.filter_by(email = email).first()
            
        if user is not None and user.check_password(password):

            login_user(user)
            
            uid = user.id

            obj = UserModel.query.filter_by(id=int(uid)).one()
            firstName = obj.firstName

            dtime = time.asctime(time.localtime(time.time()))

            job = JobModel(datetime=str(dtime), jobtype='Login', uid=uid)
            db.session.add(job)
            db.session.commit()

            return {'return': 'logged in', 'firstName': firstName}
        else:
            return {'return': 'not logged in'}

@app.route('/logout' ,methods=['GET'])
@login_required
def logout():

    uid = current_user.id

    dtime = time.asctime(time.localtime(time.time()))

    job = JobModel(datetime=str(dtime), jobtype='Logout', uid=uid)
    db.session.add(job)
    db.session.commit()

    logout_user()

    return {'return': 'logged out'}

@app.route('/allStamps' ,methods=['GET'])
@login_required
def allStamps():
    uid = current_user.id

    rows = StampCatalogImageModel.query.filter_by(uid=uid).all()
    info = []
    stampImages = []

    for row in rows:
        stampDict = {'stamp_country': row.stamp_country, 'stamp_year': row.stamp_year, 'stamp_number':row.stamp_number, 'stamp_face_value': row.stamp_face_value, 'stamp_info':row.stamp_info, 'catalog_name':row.catalog_name, 'catalog_year': row.catalog_year, 'catalog_number':row.catalog_number, 'catalog_price':row.catalog_price, 'catalog_scott_number':row.catalog_scott_number, 'catalog_verient_number':row.catalog_verient_number, 'image_name':row.image_name, 'image_type':row.image_type}
        info.append(stampDict)
        filename = DIR_FOR_IMAGES + row.image_name
        with open(filename, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
            stampImages.append(encoded_string)

    return {'info': info, 'stampImages': stampImages}

@app.route('/addStampFile', methods=['POST', 'GET'])
@login_required
def addStampFile():

    if request.method == 'GET':
        return {'return': 'hello'}
    else:

        filestr = request.files['myFile'].read()
        filename = request.form.get('filename')
        fieldName = request.form.get('fieldName')
        uid = current_user.id

        if StampCatalogImageModel.query.filter_by(image_name=filename, image_type=fieldName).first():
            return {'return':'image already present'}

        # image = ImageModel(image_name=filename, image_type=fieldName)
        # db.session.add(image)
        # db.session.commit()

        # obj = ImageModel.query.filter_by(image_name=filename).one()
        # imageid = obj.iid

        title = request.form.get('title')
        country = request.form.get('country')
        year = request.form.get('year')
        stampNumber = request.form.get('stampNumber')
        faceValue = request.form.get('faceValue')
        info = request.form.get('info')
        catalogName = request.form.get('catalogName')
        catalogNumber = request.form.get('catalogNumber')
        catalogYear = request.form.get('catalogYear')
        price = request.form.get('price')
        scottNumber = request.form.get('scottNumber')
        verientNumber = request.form.get('verientNumber')

        stampCatalog = StampCatalogImageModel(stamp_title=title, stamp_country=country, stamp_year=year, stamp_number=stampNumber, stamp_face_value=faceValue, stamp_info=info, catalog_name=catalogName, catalog_number=catalogNumber, catalog_year=catalogYear, catalog_price=price, catalog_scott_number=scottNumber, catalog_verient_number=verientNumber, image_name=filename, image_type=fieldName, uid=uid)
        db.session.add(stampCatalog)
        db.session.commit()

        dtime = time.asctime(time.localtime(time.time()))

        job = JobModel(datetime=str(dtime), jobtype='Stamp Added', uid=uid)
        db.session.add(job)
        db.session.commit()

        npimg = np.fromstring(filestr, np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        cv2.imwrite(DIR_FOR_IMAGES+ filename, img)

        ses.add_image(DIR_FOR_IMAGES + filename)
        # print(es.indices.exists(DIR_FOR_IMAGES + filename))
        # print(es.indices.exists([filename]))
        # images = [filename]
        # print(es.indices.exists('images'))

        return {'return': 'stamp added'}

@app.route('/test', methods=['GET'])
def test():
    return {'return': 'test'}

app.run(host='0.0.0.0', port=5000)
