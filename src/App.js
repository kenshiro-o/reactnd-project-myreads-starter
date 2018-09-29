import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: {
    },
    shelves: {
      "currentlyReading": "Currently Reading",
      "wantToRead": "Want To Read",
      "read": "Read",
    }
  }

  componentDidMount() {
    // Fetch all books that are associate with this session
    BooksAPI.getAll().then(books => {
      let booksMap = {}
      for (const book of books) {
        booksMap[book.id] = book
      }
      this.setState({ books: booksMap })
    })
  }

  onBookShelfChange = (e, book) => {
    e.preventDefault()
    const { books } = this.state

    // First add the book to our library if we don't have it
    if (!books[book.id]) {
      books[book.id] = book
    }
    const shelf = e.target.value
    book.shelf = shelf

    // Only update our UI if we successfully update the server
    BooksAPI.update(book, shelf).then(res => {
      this.setState({ books: books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={(history) => (
          <SearchBooks onBookShelfChange={this.onBookShelfChange} books={this.state.books} />
        )}></Route>

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {
                  Object.keys(this.state.shelves).map(s => {
                    const title = this.state.shelves[s]
                    return (
                      <BookShelf key={s} onBookShelfChange={this.onBookShelfChange}
                        title={title} books={Object.values(this.state.books).filter(b => b.shelf === s)} />
                    )
                  })
                }
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}>
        </Route>

      </div>
    )
  }
}

export default BooksApp
