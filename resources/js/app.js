/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */


require('./bootstrap');
/***************************************/
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import Master from './components/Master';
import OrderCompleted from './components/OrderCompleted';
import DisplayChosenProducts from './components/DisplayChosenProducts';
import TableRow from './components/TableRow';
import CartChosen from './components/CartChosen';
import HomePizza from './components/HomePizza';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
render(
  <Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
    
    {/* <Route path="/master" component={Master} >*/}
        <Route path="/" component={HomePizza} />
        <Route path="/display-item" component={TableRow} />
        <Route path="/order-completed" component={OrderCompleted} />
        <Route path="/display-chosen-products" component={DisplayChosenProducts} />
        <Route path="/cartChosen" component={CartChosen} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
      {/*</Route>*/}
    </Router>,
        document.getElementById('crud-app'));
/**********************************************************************/

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 

require('./components/Example');
require('./components/Index');*/
