import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TimeAgo from "javascript-time-ago"
import fr from 'javascript-time-ago/locale/fr.json'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import {UidContextProvider} from "./context/UserContext"
import {Provider} from "react-redux"
import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk"
import rootReducer from "./reducers"
//devTools
import {composeWithDevTools} from "redux-devtools-extension"
import { getUsers } from './actions/users.actions';
import { getPosts } from './actions/posts.actions';

TimeAgo.addDefaultLocale(fr)


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
store.dispatch(getUsers())
store.dispatch(getPosts())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Provider store = {store}>
    <UidContextProvider>
        <App />
    </UidContextProvider>
    </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
