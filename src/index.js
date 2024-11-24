import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import App from './App';
import {applyMiddleware,compose} from 'redux'
// import 'bootstrap/dist/css/bootstrap.css'
import thunk from 'redux-thunk'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import Reducers from './reducers'
import { ActualPriceProvider } from './components/context/Actualprice';

const store =configureStore({reducer:Reducers},compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ActualPriceProvider>
  <Provider store={store}>
  <React.StrictMode>
<BrowserRouter>
    <App />
</BrowserRouter>
  </React.StrictMode>
  </Provider>
  </ActualPriceProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
