import pymongo
from bson.objectid import ObjectId    



uri = 'mongodb://ZohairZaman:password498@ds129066.mlab.com:29066/sanitycheck'
client = pymongo.MongoClient(uri)
db = client['sanitycheck']
students = db['students']
username = 't'
classList = [ObjectId("5a25b0b5cfe560d2f4872a2b"), ObjectId("5a25b0b5cfe560d2f4872a2c"), ObjectId("5a25b0b5cfe560d2f4872a2e")]
students.update({'username': username}, {'$set': {"classes":classList}}, upsert = False)