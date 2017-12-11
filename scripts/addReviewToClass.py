import pymongo
from bson.objectid import ObjectId    



uri = 'mongodb://ZohairZaman:password498@ds129066.mlab.com:29066/sanitycheck'
client = pymongo.MongoClient(uri)
db = client['sanitycheck']
courses = db['classes']
reviews = db['reviews']
classId = ObjectId('5a25b0b5cfe560d2f4872a2c')
curClass = courses.find_one({'_id': classId})
print(curClass)

reviewObj = {
	"username": "zzsampletest",
	"class": classId,
	"quality": 4,
	"difficulty": 4,
	"hours": 15,
	"comment": "lol this class be hard af but easy too lol",
	"anon": True
}

oid = reviews.insert_one(reviewObj)
print(oid)

reviewItem = reviews.find_one({"username": "zzsampletest"})
reviewId = reviewItem.get('_id')
classReviewList = curClass.get('reviews')
if(classReviewList):
	classReviewList.append(reviewId)
else:
	classReviewList = [reviewId]

print(classReviewList)

courses.update({'_id': classId}, {'$set': {"reviews":classReviewList}}, upsert = False)