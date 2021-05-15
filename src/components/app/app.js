import React, { Component } from 'react';
import { BookstoreServiceProvider } from '../bookstore-service-context';
import BookstoreService from '../../services/bookstore-service';
import './app.css';

export default class App extends Component {

    state = {
        BookstoreService: new BookstoreService()
    }

    render(){

        const { bookstoreService } = this.state;

        return (
            <BookstoreServiceProvider value={bookstoreService}>
                <h2>Hello</h2>
            </BookstoreServiceProvider>
        )
    }    
}