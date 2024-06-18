class Book {
    constructor(Title, Author, ISBN, Id) {
        this.Title = Title;
        this.Author = Author;
        this.ISBN = ISBN;
        this.Id = Id;
        this.Borrowed = false;
    }

    isBorrowed() {
        return this.Borrowed;
    }

    borrow() {
        if (!this.Borrowed) {
            this.Borrowed = true;
            console.log(`Book borrowed: ${this.Title}`);
            return true;
        }
        return false;
    }

    return() {
        if (this.Borrowed) {
            this.Borrowed = false;
            console.log(`Book returned: ${this.Title}`);
            return true;
        }
        return false;
    }
}

class User {
    constructor(Name, Id) {
        this.Name = Name;
        this.Id = Id;
        this.borrowedBooks = [];
    }

    peakBook(ISBN) {
        return this.borrowedBooks.find(book => book.ISBN === ISBN);
    }

    borrowBook(book) {
        if (this.borrowedBooks.length < 3 && !book.isBorrowed()) {
            if (book.borrow()) {
                this.borrowedBooks.push(book);
                console.log(`${this.Name} borrowed book: ${book.Title}`);
                return true;
            }
            return false;
        }
        console.log(`${this.Name} cannot borrow more books or the book is already borrowed.`);
        return false;
    }

    returnBook(ISBN) {
        const bookIndex = this.borrowedBooks.findIndex(book => book.ISBN === ISBN);
        if (bookIndex !== -1) {
            const book = this.borrowedBooks[bookIndex];
            if (book.return()) {
                this.borrowedBooks.splice(bookIndex, 1);
                console.log(`${this.Name} returned book: ${book.Title}`);
                return true;
            }
            return false;
        }
        console.log(`Book with ISBN ${ISBN} not found in ${this.Name}'s borrowed books.`);
        return false;
    }
}

class Library {
    constructor() {
        this.Books = [];
        this.Members = [];
    }

    registerMembers(user) {
        this.Members.push(user);
        console.log(`Registered user: ${user.Name}`);
    }

    addNewBook(book) {
        this.Books.push(book);
        console.log(`Added book: ${book.Title}`);
    }

    borrowBook(user, ISBN) {
        const book = this.Books.find(book => book.ISBN === ISBN);
        if (book && user.borrowBook(book)) {
            console.log(`Book with ISBN ${ISBN} borrowed by ${user.Name}`);
            return true;
        }
        console.log(`Book with ISBN ${ISBN} cannot be borrowed by ${user.Name}`);
        return false;
    }

    returnBook(user, ISBN) {
        if (user.returnBook(ISBN)) {
            console.log(`Book with ISBN ${ISBN} returned by ${user.Name}`);
            return true;
        }
        console.log(`Book with ISBN ${ISBN} cannot be returned by ${user.Name}`);
        return false;
    }
}

// Create library instance
const myLibrary = new Library();

// Create some books
const book1 = new Book('JavaScript: The Good Parts', 'Douglas Crockford', '9780596517748', 1);
const book2 = new Book('Eloquent JavaScript', 'Marijn Haverbeke', '9781593279509', 2);
const book3 = new Book('You Don’t Know JS', 'Kyle Simpson', '9781449331818', 3);

// Add books to library
myLibrary.addNewBook(book1);


// Create user
const user1 = new User('Alice', 1);
myLibrary.registerMembers(user1);

// Borrow books
myLibrary.borrowBook(user1, '9780596517748'); // Should borrow successfully
//  return books
myLibrary.returnBook(user1, '9780596517748'); // Should return successfully

console.log('Final state of the library:');
myLibrary.Books.forEach(book => {
    console.log(`Title: ${book.Title}, Author: ${book.Author}, ISBN: ${book.ISBN}, Borrowed: ${book.isBorrowed()}`);
});
