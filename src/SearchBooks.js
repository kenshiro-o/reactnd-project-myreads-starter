import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    //  Typical JSON response looks as follows for a single book:
    //  {
    //     "title": "Science Fiction",
    //     "authors": [
    //         "Roger Luckhurst"
    //     ],
    //     "publisher": "Polity",
    //     "publishedDate": "2005-05-06",
    //     "description": "In this new and timely cultural history of science fiction, Roger Luckhurst examines the genre from its origins in the late nineteenth century to its latest manifestations. The book introduces and explicates major works of science fiction literature by placing them in a series of contexts, using the history of science and technology, political and economic history, and cultural theory to develop the means for understanding the unique qualities of the genre. Luckhurst reads science fiction as a literature of modernity. His astute analysis examines how the genre provides a constantly modulating record of how human embodiment is transformed by scientific and technological change and how the very sense of self is imaginatively recomposed in popular fictions that range from utopian possibility to Gothic terror. This highly readable study charts the overlapping yet distinct histories of British and American science fiction, with commentary on the central authors, magazines, movements and texts from 1880 to the present day. It will be an invaluable guide and resource for all students taking courses on science fiction, technoculture and popular literature, but will equally be fascinating for anyone who has ever enjoyed a science fiction book.",
    //     "industryIdentifiers": [
    //         {
    //             "type": "ISBN_13",
    //             "identifier": "9780745628936"
    //         },
    //         {
    //             "type": "ISBN_10",
    //             "identifier": "0745628931"
    //         }
    //     ],
    //     "readingModes": {
    //         "text": false,
    //         "image": true
    //     },
    //     "pageCount": 305,
    //     "printType": "BOOK",
    //     "categories": [
    //         "Language Arts & Disciplines"
    //     ],
    //     "maturityRating": "NOT_MATURE",
    //     "allowAnonLogging": false,
    //     "contentVersion": "1.2.0.0.preview.1",
    //     "imageLinks": {
    //         "smallThumbnail": "http://books.google.com/books/content?id=F3JU3SJ5fDIC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    //         "thumbnail": "http://books.google.com/books/content?id=F3JU3SJ5fDIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    //     },
    //     "language": "en",
    //     "previewLink": "http://books.google.com/books?id=F3JU3SJ5fDIC&printsec=frontcover&dq=science+fiction&hl=&cd=1&source=gbs_api",
    //     "infoLink": "http://books.google.com/books?id=F3JU3SJ5fDIC&dq=science+fiction&hl=&source=gbs_api",
    //     "canonicalVolumeLink": "https://books.google.com/books/about/Science_Fiction.html?hl=&id=F3JU3SJ5fDIC",
    //     "id": "F3JU3SJ5fDIC"
    // },


    state = {
        query: '',
        books: []
    }

    searchForBooks = (s) => {
        if (!s) {
            // Don't bother searching books if there is no search query
            this.setState({ books: [] })
            return
        }

        const propsBooks = this.props.books
        BooksAPI.search(s).then(books => {
            if (books.error) {
                this.setState({ books: [] })
                return
            }
            const merged_books = books.map((b) => {
                b.shelf = "NONE"
                return propsBooks[b.id] || b
            })
            this.setState({ books: merged_books })
        })
    }

    onQueryChange = (e) => {
        const q = e.target.value
        this.setState({ query: q })
        this.searchForBooks(q)
    }

    render() {
        const { onBookShelfChange } = this.props
        const { books } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
             NOTES: The search from BooksAPI is limited to a particular set of search terms.
             You can find these search terms here:
             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
             you don't find a specific author or title. Every search is limited by search terms.
           */}
                        <input type="text" value={this.state.query}
                            onChange={this.onQueryChange}
                            placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
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
                            )
                        }
                        )}

                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks 
