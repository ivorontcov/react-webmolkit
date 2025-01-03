import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = () => {
  return (
    <div className="container">
      <h1>Hello, React with TypeScript and Webpack 5!</h1>
      <p>This is a basic setup.</p>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
