# Digital Library

This is the repository for *Innopolis University BS18-06 Digital Library* project. To run it, you need to do the following:

1. Clone the repository to your local machine, using command
```
git clone https://github.com/yuloskov/digital_library.git
```
2. You create **.env** file in the root of the clonned repository.
3. Add the following lines to the **.env** file:
```
DATABASE_PATH=$Your_Database_Path
BOOK_PATH=$Your_Books_Storage_Path
```

So, after completing all these steps, you should have in the folder **digital_library** file named **.env** with the following contents (just an example):
```
DATABASE_PATH=/home/miserable/Documents/Study/Spring\ 2020\ IU/Software\ Project/Project/db
BOOK_PATH=/home/miserable/Documents/Study/Spring\ 2020\ IU/Software\ Project/Project/books
```