from flask import Flask, request, jsonify
from flask_cors import CORS
from collections import defaultdict
from datetime import date
import pymysql
import numpy as np
from sklearn.preprocessing import RobustScaler
import pandas as pd
import time
from datetime import datetime

# create the Flask app
app = Flask(__name__)
CORS(app)
curr_email = ""
curr_id = None
curr_date = date.today().strftime("%y-%m-%d")
db = None
today = 1
recs = defaultdict(list)
food_logs = defaultdict(list)


@app.route('/feedback', methods=['POST', 'OPTIONS'])
def feedback():
    global db, feedbacks
    data = request.get_json()

    # restaurant: string; dishes: string[]; dishes_rate: string[]; date: string; rate: number;
    if data:
        if 'restaurant' in data:
            feedbacks['restaurant'].append(data['restaurant'])
        
        if 'dishes' in data:
            if 'dishes_rate' in data:
                temp1 = data['dishes']
                temp2 = data['dishes_rate']
                temp_dict = {}
                for i in range(temp1):
                    temp_dict[temp1[i]] = temp2[i]
                
                feedbacks['dishes'].append(temp_dict)
        
        if 'date' in data:
            feedbacks['date'].append(data['date'])

        if 'rate' in data:
            feedbacks['rate'].append(data['rate'])
        print(data)

    return jsonify({'received': 'true'})

@app.route('/LoadRecommendation', methods=['POST', 'OPTIONS'])
def LoadRecommendation():
    global db
    global recs
    request_data = True
    #request_data = request.get_json()
    if request_data:
        recs['restaurant'] = 'in-n-out'
        recs['dishes'] = ['double burger', 'cheese fries', 'coke']
    return jsonify({'received': 'true'})

if __name__ == '__main__':
    db = pymysql.connect(host = 'database-1.cmi1bapx4gep.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
    cursor = db.cursor()
    sql = '''use testdata'''
    cursor.execute(sql)
    app.run(debug=True, port=3000)