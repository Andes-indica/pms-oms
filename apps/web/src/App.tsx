import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AppLayout } from "./components/AppLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ClientsPage } from "./pages/ClientsPage";
import { OrdersPage } from "./pages/OrdersPage";
import { BasketOrdersPage } from "./pages/BasketOrdersPage";
import {
  ClientDetailPage,
} from "./pages/ClientDetailPage";
import {
  UsersPage,
} from "./pages/UsersPage";

function App() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <LoginPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={<DashboardPage />}
          />

          <Route
            path="/clients"
            element={<ClientsPage />}
          />

          <Route
            path="/orders"
            element={<OrdersPage />}
          />

          <Route
            path="/basket-orders"
            element={<BasketOrdersPage />}
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="/clients/:id"
            element={<ClientDetailPage />}
          />
          <Route
            path="/users"
            element={<UsersPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;