const getUniqueId = () => Math.floor(Math.random() * 100);

class Book {
  constructor(title, author) {
    this._title = title;
    this._author = author;
  }

  get title() {
    return this._title;
  }
  get author() {
    return this._author;
  }
  toString() {
    return `${this._title}, ${this._author}`;
  }
  isTheSameBook(book) {
    if (book.title === this._title && book.author === this._author) {
      return true;
    }
    return false;
  }
}

class LibraryBookBase extends Book {
  constructor(title, author) {
    super(title, author);
    this._bookId = getUniqueId();
  }
  get bookId() {
    return this._bookId;
  }
  toString() {
    return `${this.toString}, ${this._bookId}`;
  }
}

class LibraryBook extends LibraryBookBase {
  constructor(title, author, bookId, quantity) {
    super(title, author, bookId);
    this._quantity = quantity;
  }
  get quantity() {
    return this._quantity;
  }
  set quantity(quantity) {
    this._quantity = quantity;
  }
  toString() {
    return `${this.toString}, ${this._quantity}`;
  }
  increaseQuantityBy(amount) {
    this._quantity += amount;
  }
  increaseQuantityBy(amount) {
    this._quantity -= amount;
  }
}

class ReaderBook extends LibraryBookBase {
  constructor(title, author, bookId, expirationDate) {
    super(title, author, bookId);
    this._expirationDate = expirationDate;
    this._isReturned = false;
  }
  get expirationDate() {
    return this._expirationDate;
  }
  set expirationDate(expirationDate) {
    this._expirationDate = expirationDate;
  }
  get isReturned() {
    return this._isReturned;
  }
  set isReturned(isReturned) {
    this._isReturned = isReturned;
  }
  toString() {
    return `${this.toString()}, ${this._expirationDate}, ${this._isReturned}`;
  }
}

class Reader {
  constructor(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._readerId = getUniqueId();
    this._books = [];
  }
  get firstName() {
    return this._firstName;
  }
  set firstName(firstName) {
    this._firstName = firstName;
  }
  get lastName() {
    return this._lastName;
  }
  set lastName(lastName) {
    this._lastName = lastName;
  }
  get books() {
    return this._books;
  }
  get readerId() {
    return this._readerId;
  }
  toString() {
    return `${this._firstName}, ${this._lastName}, ${this._books}, ${this._readerId}`;
  }
  borrowBook(book, library) {
    if (library.lendBook(book, this._readerId) !== null) {
      this._books.push(book);
    }
  }
}

class Library {
  constructor(books = [], readers = []) {
    this._booksArray = books;
    this._readersArray = readers;
  }
  get books() {
    return this._booksArray;
  }
  get readers() {
    return this._readersArray;
  }
  doHaveBook(requestedBook) {
    for (const iter of this._booksArray) {
      if (
        iter.title === requestedBook.title &&
        iter.author === requestedBook.author &&
        iter.quantity > 0
      ) {
        return true;
      }
    }
    return false;
  }
  addBook(newBook) {
    if (this.doHaveBook(newBook)) {
      for (const iter of this._booksArray) {
        if (iter.title === newBook.title && iter.author === newBook.author) {
          iter.quantity += 1;
        }
      }
      return this._booksArray;
    } else {
      const addBook = new Book(newBook.title, newBook.author);
      const addBookToBase = new LibraryBookBase(addBook.title, addBook.author);
      const addBookToLib = new LibraryBook(
        addBook.title,
        addBook.author,
        addBookToBase.bookId,
        1
      );
      this._booksArray.push(addBookToLib);
      return this._booksArray;
    }
  }

  addBooks(...newBooks) {
    for (const iter of newBooks) {
      this.addBook(iter);
    }
    return this._booksArray;
  }
  checkReaderId(readerId) {
    for (const iter of this._readersArray) {
      if (iter.readerId === readerId) {
        return true;
      }
    }
    return false;
  }
  lendBook(book, readerId) {
    if (this.checkReaderId(readerId)) {
      for (const iter of this._booksArray) {
        if (
          iter.title === book.title &&
          iter.author === book.author &&
          iter.quantity > 0
        ) {
          const newReaderBook = new ReaderBook(
            iter.title,
            iter.author,
            iter.bookId,
            "15.06.2021"
          );
          this._booksArray.push(newReaderBook);
          return newReaderBook;
        }
      }
      return null;
    } else return null;
  }
}

const markTwainBook = new Book(
  "The Adventures of Huckleberry Finn",
  "Mark Twain"
);
const shakespeare = new Book("Hamlet", "Shakespeare");

const markTwainToLibBookBase = new LibraryBookBase(
  markTwainBook.title,
  markTwainBook.author
);
const shakespeareToLibBookBase = new LibraryBookBase(
  shakespeare.title,
  shakespeare.author
);

const markTwainToLibBook = new LibraryBook(
  markTwainBook.title,
  markTwainBook.author,
  markTwainToLibBookBase.bookId,
  10
);
const shakespeareToLibBook = new LibraryBook(
  shakespeare.title,
  shakespeare.author,
  shakespeareToLibBookBase.bookId,
  20
);

const karenZakharyan = new Reader("Karen", "Zakharyan");

const readLoversLib = new Library(
  [markTwainToLibBook, shakespeareToLibBook],
  [karenZakharyan]
);

readLoversLib.addBook(markTwainBook);

readLoversLib.addBook({
  title: "The Three Musketeers",
  author: "Alexandre Dumas",
});

readLoversLib.addBooks(
  {
    title: "The Green Mile",
    author: "Stephen King",
  },
  {
    title: "A Song of Ice and Fire",
    author: "George R. R. Martin",
  },
  {
    title: "Mr. Nobody",
    author: "Catherine Steadman",
  }
);

karenZakharyan.borrowBook(markTwainBook, readLoversLib);

console.log(readLoversLib.checkReaderId(karenZakharyan.readerId));
console.log(readLoversLib.lendBook(markTwainBook, karenZakharyan.readerId));
