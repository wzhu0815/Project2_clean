from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from pymongo import MongoClient
import json
from bson.json_util import dumps


client = MongoClient('mongodb://localhost:27017/')
db = client.project2_db
aiport_collection = db.airport.find()
docs=list(aiport_collection)
print(dumps(docs))
# airport_data=[]
# for listing in listings:
#     airport_data.append(listing)
# test = airport_data[0:2]
# # print(test)
# print(json.loads(json_util.dumps(test)))

