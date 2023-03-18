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
import ast
import json

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
curr_food = []
curr_user = [{"restaurant name": "Mendocino Farms", "restaurant type": {"fast food", "american food"}, "restaurant address": "4175 Campus Dr, Irvine, CA 92612", "restaurant preference": 1000, "menu": [{"food_name": "Not So Fried Chicken", "tags":{"fast food", "american food", "meat", "chicken", "carbohydrates", "vegetables"}, "food preference": 1000, "calories": 1100},  {"food_name": "Sweet Heat Crispy Thai Chicken", "tags":{"fast food", "thai food", "meat", "chicken", "carbohydrates", "spicy", "vegetables"}, "food preference": 1000, "calories": 1100}, {"food_name": "Peruvian Steak", "tags":{"fast food", "american food", "meat", "beef", "vegetables", "carbohydrates"}, "food preference": 1000, "calories": 760},  {"food_name": "Vegan Banh Mi", "tags":{"fast food", "american food", "vegetables", "carbohydrates"}, "food preference": 1000, "calories": 650}, {"food_name": "Thai Mango Salad", "tags":{"fast food", "thai food", "vegetables", "fruits", "meat", "chicken", "salad"}, "food preference": 1000, "calories": 840}, {"food_name": "Pink Lady Beets & Goat Cheese Salad", "tags":{"fast food", "american food", "vegetables", "fruits", "salad"}, "food preference": 1000, "calories": 840}, {"food_name": "The Modern Caesar", "tags":{"fast food", "american food", "vegetables", "fruits"}, "food preference": 1000, "calories": 630}, {"food_name": "Mama Chen’s Chinese Chicken Salad", "tags":{"fast food", "chinese food", "vegetables", "meat", "chicken", "salad"}, "food preference": 1000, "calories": 650}, {"food_name": "Spicy Curried Couscous", "tags":{"fast food", "indian food", "vegetables", "spicy"}, "food preference": 1000, "calories": 360}, {"food_name": "Kale & Apple Rainbow Salad", "tags":{"fast food", "american food", "vegetables", "fruits", "salad"}, "food preference": 1000, "calories": 165}, {"food_name": "Basil Pesto Pasta Shells", "tags":{"fast food", "amaerican food", "vegetables", "carbohydrates"}, "food preference": 1000, "calories": 165} ]}
, {"restaurant name": "The Buffalo Spot", "restaurant type": {"korean food"}, "restaurant address": "4511 Campus Dr Suite 4511, Irvine, CA 92612", "restaurant preference": 1000, "menu":  [{"food_name": "Traditional Wings 5 Pieces", "tags":{"fast food", "american food", "meat", "chicken"}, "food preference": 1000, "calories": 840}, {"food_name": "Boneless Wings 5 Pieces", "tags":{"fast food", "american food", "meat", "chicken"}, "food preference": 1000, "calories": 360}, {"food_name": "Tenders 5 Pieces", "tags":{"fast food", "american food", "meat", "chicken"}, "food preference": 1000, "calories": 230}, {"food_name": "Traditional Wings 5 Pieces", "tags":{"fast food", "american food", "meat", "chicken"}, "food preference": 1000, "calories": 840}, {"food_name": "Cali Burrito", "tags":{"fast food", "american food", "meat", "chicken", "carbohydrates"}, "food preference": 1000, "calories": 870}, {"food_name": "Chicken Caesar Salad", "tags":{"fast food", "american food", "meat", "chicken", "vegetables", "salad"}, "food preference": 1000, "calories": 470}, {"food_name": "Buffalo Chicken Salad", "tags":{"fast food", "american food", "meat", "chicken", "vegetables", "salad"}, "food preference": 1000, "calories": 339}, {"food_name": "Side Salad", "tags":{"fast food", "american food", "vegetables", "salad"}, "food preference": 1000, "calories": 200}, {"food_name": "Nemo’s Strawberry Cake", "tags":{"fast food", "american food", "dessert", "cake", "fruits"}, "food preference": 1000, "calories": 390}, {"food_name": "Nemo’s Chocolate Cake", "tags":{"fast food", "american food", "dessert", "cake"}, "food preference": 1000, "calories": 390}, {"food_name": "Nemo’s BananaCake", "tags":{"fast food", "american food", "dessert", "cake", "fruits"}, "food preference": 1000, "calories": 390}, {"food_name": "Nemo’s Carrot Cake", "tags":{"fast food", "american food", "dessert", "cake", "vegetables"}, "food preference": 1000, "calories": 390}, {"food_name": "Breadsticks 2 Pieces", "tags":{"fast food", "american food", "carbohydrates", "bread"}, "food preference": 1000, "calories": 380} ]}
]

curr_restaurant = ''

def user_calorie_goal():
    return 10000

@app.route('/calculate_rec_restaurant', methods=['GET', 'OPTIONS'])
def calculate_rec_restaurant():
    restaurents = curr_user
    temp = sorted(restaurents, key=lambda x:x['restaurant preference'], reverse=True)
    recs = []
    for v in temp:
        if len(recs) >= 4:
            break
        recs.append(v['restaurant name'])
    return jsonify(recs)


@app.route('/calculate_calories', methods=['GET', 'OPTIONS'])
def calculate_calories():
    curr_restaurant = request.args['restaurant']
    curr_foods = ast.literal_eval(request.args['foods'])
    print(curr_restaurant, curr_foods)
    foods = {}
    for i in curr_user:
        if i['restaurant name'] == curr_restaurant:
            foods = i['menu']
    
    calories_have = 0
    for i in foods:
        if i['food_name'] in curr_foods:
            calories_have += i['calories']
    return jsonify(calories_have)

@app.route('/calculate_rec_food', methods=['GET', 'OPTIONS'])
def calculate_rec_food():
    print('3333',request.args['restaurant'], ast.literal_eval(request.args['foods']))
    curr_restaurant = request.args['restaurant']
    curr_foods = ast.literal_eval(request.args['foods'])
    foods = {}
    for i in curr_user:
        if i['restaurant name'] == curr_restaurant:
            foods = i['menu']
    
    calories_have = 0
    for i in foods:
        if i['food_name'] in curr_foods:
            calories_have += i['calories']

    temp = sorted(foods, key=lambda x:x['food preference'], reverse=True)
    recs_by_preference = []
    num = len(foods) // 3
    for v in temp:
        if len(recs) < num:
            recs_by_preference.append(v)
    
    num = len(recs_by_preference) // 2
    goal = user_calorie_goal()
    final_recs = []
    if calories_have == 0:
        for v in recs_by_preference:
            final_recs.append(v['food_name'])
    else:
        final_temp = {}
        for v in recs_by_preference:
            final_temp[abs(v['calories'] + calories_have - goal)] = v
        final_temp = dict(sorted(final_temp.items(), key=lambda x:x[0]))
        for k, v in final_temp.items():
            if len(final_recs) >= num:
                break
            final_recs.append(v['food_name'])
    print('2222',curr_restaurant)
    return jsonify(final_recs)

@app.route('/update_calories_have', methods=['POST', 'OPTIONS'])
def update_calories_have():
    if request.method == 'POST':
        data = request.data
        calories_have = data

@app.route('/get_restaurant', methods=['POST', 'OPTIONS'])
def get_restaurant():
    if request.method == 'POST':
        print(request.data)
        data = request.data
        print(type(data))
        curr_rnestaurant = str(data)
        print('1111',curr_restaurant)
    return jsonify('data')

@app.route('/feedback', methods=['POST', 'OPTIONS'])
def feedback():
    restaurants = curr_user
    if request.method == 'POST':
        data = request.get_data()
        data = json.loads(str(data)[2:-1])
        #temp = restaurants[data['restaurant']]['restaurant preference']

        for i in restaurants:
            if i['restaurant name'] == data['restaurant']:
                temp = i['restaurant preference']
                i['restaurant preference'] += (2000 - temp) * ((data['rate'] - 3) * 0.02)
                print(i['restaurant preference'])
        
        for i in restaurants:
            if i['restaurant name'] == data['restaurant']:
                for food in i['menu']:
                    if food['food_name'] == data['dish1']:
                        temp = food['food preference']
                        food['food preference'] += (2000 - temp) * ((data['dish1_rate'] - 3) * 0.02)
                        print(food['food preference'])

        for i in restaurants:
            if i['restaurant name'] == data['restaurant']:
                for food in i['menu']:
                    if food['food_name'] == data['dish2']:
                        temp = food['food preference']
                        food['food preference'] += (2000 - temp) * ((data['dish2_rate'] - 3) * 0.02)
                        print(food['food preference'])
        #print(json.loads(jsonify(str(data)[2:-1])))

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
    # db = pymysql.connect(host = 'database-1.cmi1bapx4gep.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
    # cursor = db.cursor()
    # sql = '''use testdata'''
    # cursor.execute(sql)
    app.run(debug=True, port=3000)