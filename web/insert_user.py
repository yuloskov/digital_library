import os

from application.utils import DbManager


def add_user(db_manager, login, password):
    db_manager.insert_user(login, password)


def main(argv):
    # Parse login and password
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} login password")
        exit(1)
    login, password = sys.argv[1:3]
    db_manager = DbManager.Manager()
    add_user(db_manager, login, password)


if __name__ == '__main__':
    import sys

    main(sys.argv)
