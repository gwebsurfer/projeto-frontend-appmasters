import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "../App";
import { Auth } from "../pages/Auth";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}