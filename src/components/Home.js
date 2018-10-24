import React from 'react';
import{Link} from 'react-router-dom';
import Shelf from './Shelf';
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'



class MainPage extends React.Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
    }
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll()
     .then(resp => {
       console.log(resp);
       this.setState({ books: resp});
     });
}

updateBook = (book, shelf) => {
  BooksAPI.update(book, shelf)
  .then(resp => {
    book.shelf = shelf;
    this.setState(state =>({
      books: state.books.filter(b => b.id !== book.id).concat([book])
    }));
    });
}

  render(){
    return(
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
         <Shelf updateBook={this.updateBook} name="I am Currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")} />
         <Shelf updateBook={this.updateBook} name="I Want to Read" books={this.state.books.filter(b => b.shelf === "wantToRead")} />
         <Shelf updateBook={this.updateBook} name="I HaveRead" books={this.state.books.filter(b => b.shelf === "read")} />
        </div>
</div>
        <div className="open-search">
          <Link to="/search">Search</Link>
        </div>
      </div>
    );
  }
}

//TODO: Create Add Functionality


export default MainPage;
