import React, { Component } from 'react'


class BookShelf extends Component {

    render() {
        const { books, onBookShelfChange } = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">

                        {books.map(book => (
                            <li key={book["id"]}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book["imageLinks"]["thumbnail"]}")` }} ></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={(e) => onBookShelfChange(e, book)} value={book.shelf}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="CURRENTLY_READING">Currently Reading</option>
                                                <option value="WANT_TO_READ">Want to Read</option>
                                                <option value="READ">Read</option>
                                                <option value="NONE">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    {book.authors && (
                                        <div className="book-authors">{book.authors.join(", ")}</div>
                                    )}

                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf
