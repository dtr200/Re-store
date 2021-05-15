import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { HomePage, CartPage } from '../pages';
import './app.css';

const App = () => {
    return (
        <>
        <h2>Hello</h2>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/cart-page'>Cart</Link>
            </li>
        </ul>
        <Switch>
            <Route 
                path='/' 
                component={HomePage}
                exact />
            <Route 
                path='/cart-page' 
                component={CartPage}
                exact />
        </Switch>
        </>
    )   
}

export default App;