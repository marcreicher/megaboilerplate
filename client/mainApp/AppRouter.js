import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
    <Router history={ browserHistory }>
        <Route path="/" component={ Header }>
            <Route path="about" component={ Footer } />
        </Route>
    </Router>
), document.getElementById('root'));
