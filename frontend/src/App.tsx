import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Sidenav from "./components/Sidenav/sidenav";
import Router from "./router";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="site-container">
        {/* userLoggedIn && <Sidenav /> */}
        <Sidenav />
        <div className="content">
          <Router />
        </div>
      </div>
    </div>
  );
}

export default App;
