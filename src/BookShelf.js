import React, { Component } from 'react'


class BookShelf extends Component {

    render() {
        const { books, onBookShelfChange } = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => {
                            // Use plaecholder image in case we do not not have a thumbnail cover                            
                            let bookCover = `https://via.placeholder.com/128x193?text=No+image+found`
                            if (book["imageLinks"] && book["imageLinks"]["thumbnail"]) {
                                bookCover = book["imageLinks"]["thumbnail"]
                            }

                            return (
                                <li key={book["id"]}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookCover}")` }} ></div>
                                            <div className="book-shelf-changer">
                                                <select onChange={(e) => onBookShelfChange(e, book)} value={book.shelf}>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        {book.authors && (
                                            <div className="book-authors">{book.authors.join(", ")}</div>
                                        )}
                                    </div>
                                </li>
                            )
                        }
                        )}
                    </ol>
                </div>
            </div >
        )
    }
}

export default BookShelf
