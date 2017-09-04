import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reducers from "./reducers"
import thunk from "redux-thunk"
import "./static/sass/materialize.min.css"

//development
import axios from "axios"
window.axios = axios

const store = createStore(reducers, {}, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
)
