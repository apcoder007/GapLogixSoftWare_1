import webapp2
import jinja2
import os
import json
from sets import  Set
import session_handler 
import urllib
import jinja2
import json
from google.appengine.api import urlfetch

import logging

import ast



jinja_environment = jinja2.Environment(autoescape=False,
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')))

class Main(session_handler.BaseSessionHandler):
    def get(self):
#       if self.session.get('name') and self.session.get('adminType')=="admin":
        home = jinja_environment.get_template('managemenu.html')
        self.response.write(home.render())

class resetPassword(session_handler.BaseSessionHandler):
    def get(self):
#       if self.session.get('name') and self.session.get('adminType')=="admin":
        home = jinja_environment.get_template('resetPassword.html')
        self.response.write(home.render())

class Configure(session_handler.BaseSessionHandler):
    def get(self):
#       if self.session.get('name') and self.session.get('adminType')=="admin":
        home = jinja_environment.get_template('configure.html')
        self.response.write(home.render())

class Organisation(session_handler.BaseSessionHandler):
    def get(self):
#       if self.session.get('name') and self.session.get('adminType')=="admin":
        home = jinja_environment.get_template('organisation.html')
        self.response.write(home.render())
    def post(self):
#       if self.session.get('name') and self.session.get('adminType')=="admin":
        home = jinja_environment.get_template('organisation.html')
        self.response.write(home.render())

class Bussiness(session_handler.BaseSessionHandler):
    def get(self):
#       if self.session.get('name') and self.session.get('adminType')=="admin":
        home = jinja_environment.get_template('bussiness.html')
        self.response.write(home.render())

class Services(session_handler.BaseSessionHandler):
    def get(self):
#       if self.session.get('name') and self.session.get('adminType')=="admin":
        home = jinja_environment.get_template('services.html')
        self.response.write(home.render())

class Login(session_handler.BaseSessionHandler):
    def get(self):
#       if self.session.get('name') and self.session.get('adminType')=="admin":
        home = jinja_environment.get_template('login.html')
        self.response.write(home.render())

class Popup(session_handler.BaseSessionHandler):
    def get(self):
#       if self.session.get('name') and self.session.get('adminType')=="admin":
        home = jinja_environment.get_template('popup.html')
        self.response.write(home.render())





app = webapp2.WSGIApplication([
    ('/admin/managemenu',Main),
    ('/admin/configure',Configure),
    ('/admin/organisation',Organisation),
    ('/admin/bussiness',Bussiness),
    ('/admin/services',Services),
    ('/admin/login',Login),
    ('/admin/popup',Popup),
    ('/admin/reset/password', resetPassword)
    


], debug=True,
config = session_handler.myconfig_dict)
1