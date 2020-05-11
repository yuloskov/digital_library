import os
import hashlib
import binascii

from pymongo import MongoClient
from bson.objectid import ObjectId


class Manager:
    def __init__(self):
        self.client = MongoClient(os.environ['DATABASE_URL'])
        self.db = self.client['db']

    def hash_password(self, password):
        '''Hash a password for storing.'''
        salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
        pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                      salt, 100000)
        pwdhash = binascii.hexlify(pwdhash)
        return (salt + pwdhash).decode('ascii')

    # check hash of a password with a password in database
    def verify_password(self, stored_password, provided_password):
        '''Verify a stored password against one provided by user'''
        salt = stored_password[:64]
        stored_password = stored_password[64:]
        pwdhash = hashlib.pbkdf2_hmac('sha512',
                                      provided_password.encode('utf-8'),
                                      salt.encode('ascii'),
                                      100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')
        return pwdhash == stored_password

    # check validity for given login and password
    def check_validity(self, login, password):
        user = self.get_user(login)
        if user:
            stored_password = user['password']
            return self.verify_password(stored_password=stored_password,
                                        provided_password=password)
        else:
            return False

    def insert_user(self, login, password, role):
        hashed_password = self.hash_password(password)
        user = {'login': login, 'password': hashed_password, 'role': role}
        self.db.users.insert_one(user)

    def get_user(self, login):
        record = self.db.users.find_one({'login': login})
        return record

    def get_list_of_books(self):
        books = list(self.db.books.find({'approved': 'true'}))
        return books

    def get_list_of_books_to_approve(self):
        books = list(self.db.books.find({'approved': 'false'}))
        return books

    def get_books_by_title(self, title):
        books = list(self.db.books.find({'title': {
            '$regex': f'.*{title}.*',
            '$options': 'i',
        }}))
        return books

    def get_books_by_tag(self, tag):
        subject_books = list(self.db.books.find({'subject_tag': {
            '$regex': f'.*{tag}.*',
            '$options': 'i',
        }}))
        course_books1 = list(self.db.books.find({'course_tag1': {
            '$regex': f'.*{tag}.*',
            '$options': 'i',
        }}))
        course_books2 = list(self.db.books.find({'course_tag2': {
            '$regex': f'.*{tag}.*',
            '$options': 'i',
        }}))
        course_books3 = list(self.db.books.find({'course_tag3': {
            '$regex': f'.*{tag}.*',
            '$options': 'i',
        }}))
        books = subject_books + course_books1 + course_books2 + course_books3
        return books

    def insert_book(self, data):
        """
        Inserts the book ar article into the database.

        :param data: dict
            Should have the following structure:
                {
                'title',
                'description',
                'filename'
                'img',
                'subject_tag',
                'course_tag1',
                'course_tag2', *optional
                'course_tag3', *optional
                'approved',
                }
        """
        self.db.books.insert_one(data)

    def approve_article(self, article_id):
        article_id = ObjectId(article_id)
        self.db.books.update_one(
            {'_id': article_id},
            {'$set': {'approved': 'true'}},
        )

    def get_requests(self):
        requests = list(self.db.upload_requests.find({}))
        return requests

    def upload_request(self, title):
        self.db.upload_requests.insert_one({'title': title})

    def delete_request(self, request_id):
        request_id = ObjectId(request_id)
        self.db.upload_requests.delete_one({'_id': request_id})
