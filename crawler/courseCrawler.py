from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0
from selenium.webdriver.common.by import By
import urllib.request
import sys
import pymongo
import ssl
import math

class CourseItem:
	number = 0
	major = ""
	title = ""
	department = ""
	credits = 0
	description = "N/A"

	def __init__(self, number, major, title, department, credits, description):
		self.number = number
		self.major = major
		self.title = title
		self.department = department
		self.credits = credits
		if(not bool(not description or description.isspace())):
			self.description = description


def printClass(course):
	print("Course number: " + str(course.number) + "\nCourse major : " + course.major + "\nCourse title: " + course.title + "\nCourse department: " + course.department)
	print("Credit hours: " + str(course.credits))
	print("Course description: " + course.description)

baseUrl = 'https://courses.illinois.edu'
start = 'https://courses.illinois.edu/schedule/2017/fall'
page = urllib.request.urlopen(start) 
soup = BeautifulSoup(page, 'html.parser')
uri = 'mongodb://ZohairZaman:password498@ds129066.mlab.com:29066/sanitycheck'
client = pymongo.MongoClient(uri)
db = client['sanitycheck']
courses = db['classes']

i = 0
soup.prettify()
courseCounter = 0
for item in soup.find_all('tr'):
	i += 1
	if(len(item.find_all('th'))):
		continue
	subjectPage = urllib.request.urlopen(start + '/' + item.td.text.strip())
	innersoup = BeautifulSoup(subjectPage, 'html.parser')
	innersoup.prettify()
	department = innersoup.find_all('h1')[0].text.strip()
	if i < 65:
		continue
	courseList = []
	for coursepage in innersoup.find_all('tr'):
		if(len(coursepage.find_all('th'))):
			continue
		courseUrl = urllib.request.urlopen(baseUrl+coursepage.find('a')['href'])
		courseSoup = BeautifulSoup(courseUrl, 'html.parser')
		courseSoup.prettify()
		name = courseSoup.find("h1", {"class": "app-inline"}).text
		number = int(name.split(" ")[1])
		major = name.split(" ")[0]
		title = courseSoup.find("span", {"class": "app-label app-text-engage"}).text
		credits = int(math.ceil(float(courseSoup.find_all('p')[0].text.strip().split(" ")[1])))
		description = courseSoup.find_all('p')[1].text.strip()
		curCourse = CourseItem(number, major, title, department, credits, description)
		curCourseDict = {
			"number": number,
			"major": major,
			"title": title,
			"department": department,
			"credits": credits,
			"description": description
		}
		printClass(curCourse)
		courseList.append(curCourseDict)
	courses.insert_many(courseList)


# uri = 'mongodb://ZohairZaman:password498@ds129066.mlab.com:29066/sanitycheck'
# client = pymongo.MongoClient(uri)
# db = client['sanitycheck']
# courses = db['classes']
# courses.insert_many(courseList)

