import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { withBookstoreService } from '../hoc';
import { compose } from '../../utils';
import { bindActionCreators } from 'redux';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
    return (
        <ul className='book-list'>
            {
                books.map((item) => 
                    <li key={item.id}>
                        <BookListItem book={item}
                                      onAddedToCart={() => onAddedToCart(item.id)} />
                    </li>)
            }                
        </ul>
    )      
}

class BookListContainer extends Component {

    componentDidMount(){
        this.props.fetchBooks();  
    }

    render(){
        const { books, loading, error, onAddedToCart } = this.props;

        if(loading)
            return <Spinner />;

        if(error)
            return <ErrorIndicator />;

        return <BookList books={books}
                         onAddedToCart={onAddedToCart} /> ;
    }  
}

const mapStateToProps = ({ bookList: { books, loading, error } }) => {
    return {
        books,
        loading,
        error
    }
}

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return bindActionCreators({
        fetchBooks: fetchBooks(bookstoreService),
        onAddedToCart: bookAddedToCart
    }, dispatch);
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
    )(BookListContainer);