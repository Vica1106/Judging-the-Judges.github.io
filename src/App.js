import React from "react";
import GlobalStyles from 'styles/GlobalStyles';
import { css } from "styled-components/macro"; //eslint-disable-line

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "pages/Home.js";
import Leaderboard from "pages/Leaderboard.js";
import Prompts from "pages/Prompts.js";
import Results from "pages/Results.js";
import Team from "pages/Team.js";
import Blog from "pages/BlogIndex.js";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/results" element={<Results />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Router>
    </>
  );
}
