/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */


require('./bootstrap');
/***************************************/
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';

import Master from './components/Master';
import CreateProduct from './components/CreateProduct';
import DisplayProduct from './components/DisplayProduct';
import UpdateProduct from './components/UpdateProduct';
import OrderCompleted from './components/OrderCompleted';
import DisplayChosenProducts from './components/DisplayChosenProducts';
import TableRow from './components/TableRow';
import CartChosen from './components/CartChosen';

//import cart from './resources/views/cart';
render(
  <Router history={browserHistory}>
      <Route path="/" component={Master} >
        <Route path="/add-item" component={CreateProduct} />
        <Route path="/display-item" component={TableRow} />
        <Route path="/order-completed" component={OrderCompleted} />
        <Route path="/display-chosen-products" component={DisplayChosenProducts} />
        <Route path="/cartChosen" component={CartChosen} />
        <Route path="/edit/:id" component={UpdateProduct} />
       
 
      
      </Route>
    </Router>,
        document.getElementById('crud-app'));
/**********************************************************************/

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 

require('./components/Example');
require('./components/Index');*/
