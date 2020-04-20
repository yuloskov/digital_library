# I encourage you not to include this in master branch. You should rewrite this from scratch. It will not work in production, I think!

from flask import (
    Blueprint,
    request,
    redirect,
    url_for,
    render_template,
)

from application.utils import DbManager

bp = Blueprint('search_article', __name__)


@bp.route('/search_article', methods=['GET', 'POST'])
def search_article():
    book_title = ''
    if 'data' in request.form:
        book_title = request.form['data']
    print(book_title)
    db_manager = DbManager.Manager()
    book_list = db_manager.get_books_by_title(book_title)
    book_dict = {}
    i = 0
    for book in book_list:
        book['_id'] = str(book['_id'])
        book_dict[i] = book
        i += 1

    return book_dict
