import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Sidenav from "./components/Sidenav/sidenav";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidenav />
    </div>
  );
}

export default App;
