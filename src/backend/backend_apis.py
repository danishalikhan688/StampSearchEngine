from flask import Flask, request, jsonify
from flask import Flask,render_template,request,redirect
from flask_login import login_required, current_user, login_user, logout_user
from models import UserModel,db,login, JobModel
import time
from PIL import Image
import urllib.request as urllibRequest
import requests
# import urllib

app = Flask(__name__)
app.secret_key = 'xyz'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stampSearchEngine.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
 
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

@app.route('/addStampFile', methods=['POST'])
def addStampFile():
    
    print("Here")
    
    data = request.files['file']

    print("Here")

    data.save('yumpum.jpg')

    return {'return': 'file'}

@app.route('/addStamp', methods=['POST'])
def addStamp():

    data = request.get_json()

    uid = current_user.id

    dtime = time.asctime(time.localtime(time.time()))

    job = JobModel(datetime=str(dtime), jobtype='Stamp Added', uid=uid)
    db.session.add(job)
    db.session.commit()

    return {'return': 'stamp added'}

@app.route('/test', methods=['GET'])
def test():
    return {'return': 'test'}

app.run(host='0.0.0.0', port=5000)