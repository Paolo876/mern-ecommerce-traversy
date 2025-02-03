import React from "react";
import ReactDOM from "react-dom/client";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import { Provider } from 'react-redux';
import store from "./store/store";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
    <Provider store={store}>    
      <App />
    </Provider>
  </GoogleOAuthProvider>

  </React.StrictMode>
);
