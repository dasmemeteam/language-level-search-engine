import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';


// views
import App from './views/App';
import Results from './views/Results';

// Build the browser history
var hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path='/results' component={Results} />
            <Route path='/' component={App} />
        </Switch>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
