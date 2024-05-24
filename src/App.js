import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./files/pages/homepage";
import Dashboard from "./files/pages/dashboard";
import Upload from "./files/pages/upload";
import View from "./files/pages/view";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/view/:modelname" element={<View />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
