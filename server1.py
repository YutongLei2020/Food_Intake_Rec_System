from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql


app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['GET'])
def test():
    print("hellooooo")
    return jsonify(['hello1', 'hello2'])

@app.route('/test2', methods=['POST', 'GET'])
def test2():
    print(request.method)
    if request.method == 'POST':
        print(request.get_data())
        data = request.get_json()
        print(data)
    print('not')
    return jsonify('hello')

# db = pymysql.connect(host = 'database-1.cmi1bapx4gep.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
# db = pymysql.connect(host = '155.138.218.218', user = 'ionic', password = '12345678')
# cursor = db.cursor()
# sql = '''use testdata'''
# cursor.execute(sql)


app.run(debug=True, port=3001)
 