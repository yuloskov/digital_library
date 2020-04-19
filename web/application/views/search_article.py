# I encourage you not to include this in master branch. You should rewrite this from scratch. It will not work in production, I think!

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
    return "<article class=\"main__content__article\" id=\"article_1\"><div class=\"main__content__article_wrapper\"><h1 class=\"main__content__article__header\">Article 1</h1><div class=\"main__content__article__description\">Article 1</div></div></article>" + "<article class=\"main__content__article\" id=\"article_2\"><div class=\"main__content__article_wrapper\"><h1 class=\"main__content__article__header\">Article 1</h1><div class=\"main__content__article__description\">Article 2</div></div></article>"
