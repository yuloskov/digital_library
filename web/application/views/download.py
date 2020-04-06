from flask import (
    Blueprint,
    request,
    redirect,
    url_for,
    render_template,
)

from application.utils import DbManager

bp = Blueprint('download', __name__)


@bp.route('/download', methods=['GET', 'POST'])
def download():
    db_manager = DbManager.Manager()
    folder = 'var/books'
    books = db_manager.get_list_of_books()
    print(books)
    return render_template(
        'download.html',
        books=books,
    )
