import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "../App";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}