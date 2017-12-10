import pymongo

uri = 'mongodb://ZohairZaman:password498@ds129066.mlab.com:29066/sanitycheck'
client = pymongo.MongoClient(uri)
db = client['sanitycheck']
courses = db['classes']
courses.update({}, {'$set': {"reviews":[]}}, upsert = False, multi = True)