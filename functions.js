const authors = require("./authors.json");
const books = require("./books.json");

/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  const bookObject = books.find((book) => book.id === bookId);
  if (bookObject) return bookObject;
  else {
    return "no matching book is found";
  }
}
console.log(getBookById(12, books));

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  return authors.find(
    (author) => author.name.toLowerCase() === authorName.toLowerCase()
  );
}
console.log(getAuthorByName("J.K. Rowling", authors));

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here
}
console.log(bookCountsByAuthor(authors));

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  books.forEach((book) => {
    const color = book.color;

    colors[color] = colors[color] || [];
    colors[color].push(book.title);
  });

  return colors;
}

console.log(booksByColor(books));

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  const author = authors.find(
    (author) => author.name.toLowerCase() === authorName.toLowerCase()
  );
  if (author) {
    return books
      .filter((book) =>
        book.authors.some(
          (a) => a.name.toLowerCase() === authorName.toLowerCase()
        )
      )
      .map((book) => book.title);
  }
  return [];
}

console.log(titlesByAuthorName("George R.R. Martin", authors, books));

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  let prolificAuthor = authors[0];
  authors.forEach((author) => {
    if (author.books.length > prolificAuthor.books.length) {
      prolificAuthor = author;
    }
  });

  return prolificAuthor.name;
}
console.log(mostProlificAuthor(authors));

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return [];
  }

  const relatedTitles = new Set();

  const bookAuthors = book.authors
    .map((authorId) => {
      const author = authors.find((a) => a.id === authorId);
      return author ? author.name : null;
    })
    .filter((name) => name); // Filter out nulls

  books.forEach((b) => {
    if (
      b.authors.some((authorId) =>
        bookAuthors.includes(authors.find((a) => a.id === authorId).name)
      )
    ) {
      relatedTitles.add(b.title);
    }
  });

  return Array.from(relatedTitles);
}

console.log(relatedBooks(50, authors, books));

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  const coAuthorshipCount = {};

  authors.forEach((author) => {
    coAuthorshipCount[author.name] = 0;
  });

  authors.forEach((author) => {
    author.books.forEach((bookId) => {
      const book = books.find((b) => b.id === bookId);
      if (book) {
        book.authors.forEach((authorId) => {
          const coAuthor = authors.find((a) => a.id === authorId);
          if (coAuthor && coAuthor.name !== author.name) {
            coAuthorshipCount[author.name]++;
          }
        });
      }
    });
  });

  return Object.keys(coAuthorshipCount).reduce((a, b) =>
    coAuthorshipCount[a] > coAuthorshipCount[b] ? a : b
  );
}
console.log(friendliestAuthor(authors));

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor,
};
