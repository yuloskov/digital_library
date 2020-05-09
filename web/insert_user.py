import os

from application.utils import DbManager


def add_user(db_manager, login, password, role):
    db_manager.insert_user(login, password, role)


def main(argv):
    # Parse login and password
    if len(sys.argv) != 4:
        print(f"Usage: {sys.argv[0]} login password")
        exit(1)
    login, password, role = sys.argv[1:4]
    db_manager = DbManager.Manager()
    add_user(db_manager, login, password, role)


if __name__ == '__main__':
    import sys

    main(sys.argv)
