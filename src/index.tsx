import React from "react";
import ReactDOM from "react-dom/client";
import Webmolkit from "./Webmolkit";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Webmolkit />
  </React.StrictMode>
);
