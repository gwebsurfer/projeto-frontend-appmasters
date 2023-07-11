import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "../App";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}