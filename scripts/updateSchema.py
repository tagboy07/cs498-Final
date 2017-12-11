import pymongo

uri = 'mongodb://ZohairZaman:password498@ds129066.mlab.com:29066/sanitycheck'
client = pymongo.MongoClient(uri)
db = client['sanitycheck']
courses = db['classes']
courses.update({}, {'$set': {"quality":3, "difficulty":3, "hours": 3}}, upsert = False, multi = True)