from flask import (
    Blueprint,
    request,
)

from application.db_manager import DbManager

bp = Blueprint('article', __name__)


@bp.route('/choose_article', methods=['GET', 'POST'])
def choose_article():
    db_manager = DbManager.Manager()

    tag = ''

    if 'data' in request.form:
        tag = request.form['data']

    book_list = db_manager.get_books_by_tag(tag)

    book_dict = {}
    i = 0
    for book in book_list:
        book['_id'] = str(book['_id'])
        book_dict[i] = book
        i += 1

    return book_dict


@bp.route('/search_article', methods=['GET', 'POST'])
def search_article():
    db_manager = DbManager.Manager()

    book_title = ''
    if 'data' in request.form:
        book_title = request.form['data']
    print(book_title)
    book_list = db_manager.get_books_by_title(book_title)
    book_dict = {}
    i = 0
    for book in book_list:
        book['_id'] = str(book['_id'])
        book_dict[i] = book
        i += 1

    return book_dict
