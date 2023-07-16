import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "../App";
import { Auth } from "../pages/Auth/index";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/projeto-frontend-appmasters">
          <Route exact index element={<App />} />
          <Route path="/projeto-frontend-appmasters/auth" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}