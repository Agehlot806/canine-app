import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-step-progress-bar/styles.css";
import "react-image-lightbox/style.css";
import "react-awesome-lightbox/build/style.css";
import "animate.css/animate.min.css";
import { CartProvider } from './component/context/addToCartContext'
import { NotificationProvider } from "./component/context/notificationContext";
import { CartWithoutLoginProvider } from "./component/context/AddToCardWithoutLogin";
import { AuthProvider } from "./component/context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <CartProvider>
      <NotificationProvider>
        <CartWithoutLoginProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartWithoutLoginProvider>
      </NotificationProvider>
    </CartProvider>

  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
