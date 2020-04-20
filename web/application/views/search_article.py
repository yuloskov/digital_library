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
    return [{'_id': ObjectId('5e8af0c48ca6347f6141098c'), 'title': 'book',
             'filename': '11b_lab_session (1).pdf'},
            {'_id': ObjectId('5e8af2799f493a218f4003ec'), 'title': 'img',
             'filename': 'ch1.png'},
            {'_id': ObjectId('5e8b53eae1694a3fac1a8776'), 'title': 'some_book',
             'filename': '11b_lab_session_exercises.pdf'},
            {'_id': ObjectId('5e8c26073f50e74b393223d4'), 'title': 'ex',
             'description': 'desc', 'filename': '234.pdf.pdf',
             'img': 'example.jpeg'},
            {'_id': ObjectId('5e8c269b3f50e74b393223d8'), 'title': 'ex',
             'description': 'desc', 'filename': 'Allocation_105.pdf',
             'img': 'example.jpeg'},
            {'_id': ObjectId('5e8c270e959979474d2f7111'), 'title': 'ex',
             'description': 'desc', 'filename': '34-YM.pdf',
             'img': 'example.jpeg'},
            {'_id': ObjectId('5e8c27dbb4f19b0adf60afcc'), 'title': 'ex',
             'description': 'desc', 'filename': 'Allocation_105.pdf',
             'img': 'example.jpeg'},
            {'_id': ObjectId('5e8c282c108afe7373238593'), 'title': 'ex',
             'description': 'desc', 'filename': 'AI_midterm_2017.pdf',
             'img': 'example.jpeg'},
            {'_id': ObjectId('5e8c29395113fb7eadfe8ebb'), 'title': 'e1',
             'description': 'desc1',
             'filename': 'Atrifact 3 – Impact mapping.pdf',
             'img': 'идущий к реке.png'},
            {'_id': ObjectId('5e8c85747e93a9c04ef935c2'), 'title': 'book1',
             'description': 'description1', 'filename': 'Allocation_105.pdf',
             'img': 'ch1.png'}]
