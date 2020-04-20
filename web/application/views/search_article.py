# I encourage you not to include this in master branch. You should rewrite this from scratch. It will not work in production, I think!

from bson.objectid import ObjectId
from flask import (
    Blueprint,
    request,
    redirect,
    url_for,
    render_template,
)

bp = Blueprint('search_article', __name__)


@bp.route('/search_article', methods=['GET'])
def search_article():
    return {'0': {'_id': ObjectId('5e8af0c48ca6347f6141098c'), 'title': 'book',
                  'filename': '11b_lab_session (1).pdf'},
            '1': {'_id': ObjectId('5e8af2799f493a218f4003ec'), 'title': 'img',
                  'filename': 'ch1.png'},
            '2': {'_id': ObjectId('5e8b53eae1694a3fac1a8776'),
                  'title': 'some_book',
                  'filename': '11b_lab_session_exercises.pdf'},
            '3': {'_id': ObjectId('5e8c26073f50e74b393223d4'), 'title': 'ex',
                  'description': 'desc', 'filename': '234.pdf.pdf',
                  'img': 'example.jpeg'}
            }
