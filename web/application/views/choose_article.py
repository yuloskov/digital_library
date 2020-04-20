from flask import (
    Blueprint,
    request,
    redirect,
    url_for,
    render_template,
)

from application.utils import DbManager

bp = Blueprint('choose_article', __name__)


@bp.route('/choose_article', methods=['GET', 'POST'])
def choose_article():
    tag = ''

    if 'data' in request.form:
        tag = request.form['data']

    db_manager = DbManager.Manager()
    book_list = db_manager.get_books_by_tag(tag)

    book_dict = {}
    i = 0
    for book in book_list:
        book['_id'] = str(book['_id'])
        book_dict[i] = book
        i += 1

    return book_dict
