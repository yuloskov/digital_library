from pymongo import MongoClient
import hashlib,binascii, os

class Manager(object):
    def connect(self):
        self.client = MongoClient('mongodb://db:27017/')
    def hash_password(password):
        """Hash a password for storing."""
        salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
        pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                salt, 100000)
        pwdhash = binascii.hexlify(pwdhash)
        return (salt + pwdhash).decode('ascii')
    #
    # insert user's login and password
    def insert_user(self,login,password):
        hashed_password=self.hash_password(password)
        db=self.client['db']
        post={"login":login,"password":hashed_password}
        db.posts.insert_one(post)
    def get_user(self,login):
        db=self.client['db']
        record=db.posts.find_one({"login":login})
        return record

    # check hash of a password with a password in database
    def verify_password(stored_password, provided_password):
        """Verify a stored password against one provided by user"""
        salt = stored_password[:64]
        stored_password = stored_password[64:]
        pwdhash = hashlib.pbkdf2_hmac('sha512',
                                      provided_password.encode('utf-8'),
                                      salt.encode('ascii'),
                                      100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')
        return pwdhash == stored_password

    # check validity for given login and password
    def check_validity(self,login,password):
        user=self.get_user(self,login)
        stored_password=user["password"]
        return self.verify_password(stored_password=stored_password,provided_password=password)

