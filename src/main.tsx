import App from "@/App.tsx";
import bookingStore from "@/store/BookingStore.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "mobx-react";
import "@/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider bookingStore={bookingStore}>
      <App />
    </Provider>
    ,
  </React.StrictMode>
);
