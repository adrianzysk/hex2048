import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Game } from "./Game";
import { LandingPage } from "./LandingPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};
