import os
from google.appengine.api import memcache
# from oauth2client.appengine import AppAssertionCredentials

from google.appengine.api import rdbms
from datetime import datetime
import time

import MySQLdb


 
CLOUDSQL_USER ='root'
CLOUDSQL_PASSWORD='tech@gtrans'
_INSTANCE_NAME = 'moovo-967:us-central1:apidata' 


def connect_to_cloudsql(dbname):

	# When deployed to App Engine, the `SERVER_SOFTWARE` environment variable will be set to 'Google App Engine/version'.
	if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
		# Connect using the unix socket located at
		# /cloudsql/cloudsql-connection-name.
		cloudsql_unix_socket = os.path.join('/cloudsql', _INSTANCE_NAME)

		db = MySQLdb.connect( unix_socket=cloudsql_unix_socket, user=CLOUDSQL_USER, passwd=CLOUDSQL_PASSWORD, db=dbname)

	# If the unix socket is unavailable, then try to connect using TCP. This will work if you're running a local MySQL server or using the Cloud SQL proxy, for example: cloud_sql_proxy -instances=your-connection-name=tcp:3306
	else:
		db = MySQLdb.connect(
			host='35.184.119.172',  user=CLOUDSQL_USER, passwd=CLOUDSQL_PASSWORD, db=dbname)

	return db


			   
class GetData():

	def getLoginData(self, username, password):
		dbname="gaplogix"
		conn = connect_to_cloudsql(dbname)
		cursor = conn.cursor()
		sqlcmd = "select * from login_details where username='%s' and password='%s'"%(username, password)
		print sqlcmd
		cursor.execute(sqlcmd)
		dbDetails = []
		for row in cursor.fetchall():
			dbDetails.append(row)
		conn.commit()
		conn.close()
		print 'dbDetails', dbDetails
		return dbDetails

	


	