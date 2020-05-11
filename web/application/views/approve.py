from flask import (
    Blueprint,
    request,
)
from flask_login import login_required, current_user

from application.db_manager import DbManager

bp = Blueprint('approve', __name__)


@bp.route('/to_approve', methods=['GET'])
@login_required
def get_books_to_approve():
    db_manager = DbManager.Manager()
    user = db_manager.get_user(current_user.id)

    if user['role'] != 'admin':
        return {}

    books = db_manager.get_list_of_books_to_approve()

    book_dict = {}
    i = 0
    for book in books:
        book['_id'] = str(book['_id'])
        book_dict[i] = book
        i += 1

    return book_dict


@bp.route('/approvals', methods=['GET', 'POST'])
@login_required
def approvals():
    db_manager = DbManager.Manager()
    user = db_manager.get_user(current_user.id)

    if user['role'] != 'admin':
        return {}

    action = ''
    article_id = ''

    if 'action' in request.form:
        action = request.form['action']
    if 'article_id' in request.form:
        article_id = request.form['article_id']

    if action == 'Approve':
        db_manager.approve_article(article_id)
    elif action == 'Decline':
        db_manager.delete_article(article_id)

    return {}
