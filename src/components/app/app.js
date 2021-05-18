import React from 'react';
import ShopHeader from '../shop-header';
import { Route, Switch } from 'react-router-dom';
import { HomePage, CartPage } from '../pages';
import './app.css';

const App = () => {
    return (
        <main role='main' className="container">
            <ShopHeader numItems={5} total={210}/>
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
        </main>
    )   
}

export default App;