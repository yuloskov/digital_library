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
    # books = db_manager.get_list_of_books()
    books = [
        {'_id': 'bookid1',
         'title': '1',
         'description': 'desc',
         'img': 'Ross_Networks.jpg'
         },
        {'_id': 'bookid2',
         'title': '2',
         'description': 'desc2',
         'img': 'Russell_AI.jpg'
         },
    ]
    return render_template(
        'download.html',
        books=books,
    )
