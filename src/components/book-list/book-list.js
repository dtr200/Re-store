import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions';
import { withBookstoreService } from '../hoc';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

const BookList = ({ books }) => {
    return (
        <ul className='book-list'>
            {
                books.map((item) => 
                    <li key={item.id}>
                        <BookListItem book={item} />
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
        const { books, loading, error } = this.props;

        if(loading)
            return <Spinner />;

        if(error)
            return <ErrorIndicator />;

        return <BookList books={books} /> ;
    }  
}

const mapStateToProps = ({ books, loading, error }) => {
    return {
        books,
        loading,
        error
    }
}

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch)
    }
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
    )(BookListContainer);