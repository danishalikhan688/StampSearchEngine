from flask import Flask, request, jsonify
from flask import Flask,render_template,request,redirect
from flask_login import login_required, current_user, login_user, logout_user

app = Flask(__name__)
app.secret_key = 'xyz'

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    return {'return': 'registered'}

# @app.route('/test', methods=['GET'])
# def test():
#     return {'return': 'test'}

app.run(host='0.0.0.0', port=5000)