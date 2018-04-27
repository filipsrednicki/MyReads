import React from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  }

  componentDidMount() {
    this.getBooks()
  }

  componentWillReceiveProps(){
    this.setState({searchedBooks: []})
  }

// Using BooksAPI gets books that are in your library
  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
  	})
  }

// From search results adds book to your library
  addBook = (book, shelf) => {
    book.shelf = shelf
    this.setState((state) => ({
      books: state.books.concat([book])
    }))
    BooksAPI.update(book, shelf).then(response => {
      console.log(response)
      this.getBooks()
    })
  }

// Moving books between shelfs
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      console.log(response)
      this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id)
     }))
      this.getBooks()
    })
  }

// As user types into search input field, display matching results
  displayBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          console.log('Something went wrong')
          this.setState({searchedBooks: []})
          return
        }
        books.map(foundBook => {
          foundBook.shelf = 'none'
          return this.state.books.forEach(book => {
            if (book.id === foundBook.id) {
              foundBook.shelf = book.shelf
              }
            })
          })
        this.setState({searchedBooks: books})
    })
      } else {
        this.setState({searchedBooks: []})
        }
   }

render() {
    return (
      <div className="app">
       	<Route exact path='/' render={() => (
  			<ListBooks
  			  onMove={this.moveBook}
  			  books={this.state.books}
            />
  		)}/>
        <Route path='/search' render={() => (
            <SearchBooks
              searchedBooks={this.state.searchedBooks}
			  onDisplay={this.displayBooks}
			  onAdd={this.addBook}
			/>
         )}/>
      </div>
    )
  }
}

export default BooksApp
