import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';


class SearchPage extends React.Component{

state = {
  books: [],
  results: [],
  search: ""
}

  componentDidMount(){
    BooksAPI.getAll()
     .then(resp => {
       this.setState({ books: resp});
     });
}

updateSearch = (search) => {
  this.setState({search: search}, this.submitSearch);
}

submitSearch() {
  if(this.state.search === '' || this.state.search === undefined) {
    return this.setState({ results: [] });
    }
  BooksAPI.search(this.state.search.trim()).then(res=> {
    if(res.error) {
      return this.setState({ results: [] });
    }
    else {
      res.forEach(book => {
        let filter = this.state.books.filter(Book => Book.id === book.id);
        if(filter[0]){
          book.shelf = filter[0].shelf;}
      });
      return this.setState({ results: res});
    }
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
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
             <input type="text" placeholder="Search by title" value={this.state.query}
              onChange={(event) => this.updateSearch(event.target.value)} />
          </div>
         </div>s
        <div className="search-books-results">
          <ol className="books-grid">
           {
             this.state.results.map((book, key) => <Book updateBook ={this.updateBook} book={book} key={key} />)
           }
           </ol>
        </div>
      </div>
    );
  }
}

//TODO: Create "Add to Cart" icon on search page so that when a user searchs for a
//a book and identify it as want to read a message pops up asking if the user would
//like to add the book to their amazon cart.
export default SearchPage;
