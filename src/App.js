import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./files/pages/homepage";
import Dashboard from "./files/pages/dashboard";
import Upload from "./files/pages/upload";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
