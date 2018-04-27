import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Books from './Books'

class ListBooks extends Component {
  render() {
    const { books } = this.props
    
  	return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <Books 
                  books={books.filter(book => book.shelf === 'currentlyReading')} 
                  onMove={this.props.onMove}
				/>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <Books 
                  books={books.filter(book => book.shelf === 'wantToRead')} 
                  onMove={this.props.onMove} 
				/>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <Books  
                  books={books.filter(book => book.shelf === 'read')} 
                  onMove={this.props.onMove} 
				/>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks