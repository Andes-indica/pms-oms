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
import {
  ZerodhaCallbackPage,
} from "./pages/ZerodhacallbackPage";
import {
  RiskPage,
} from "./pages/RiskPage";
import {
  ClientOrderConfirmationPage,
} from "./pages/ClientOrderConfirmationPage";
import {
  AuditPage,
} from "./pages/AuditPage";
import {
  AccountSetupPage,
} from "./pages/AccountSetupPage";
import {
  PermissionRoute,
} from "./components/PermissionRoute";

function AuthenticatedLayout() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <LoginPage />;
  }

  return <AppLayout />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/account-setup"
          element={<AccountSetupPage />}
        />
        <Route
          path="/client-confirmation"
          element={
            <ClientOrderConfirmationPage />
          }
        />
        <Route
          path="/broker/zerodha/callback"
          element={
            <ZerodhaCallbackPage />
          }
        />
        <Route
        element={
          <AuthenticatedLayout />
        }>
          <Route
            path="/"
            element={
              <PermissionRoute permission="VIEW_DASHBOARD">
                <DashboardPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/clients"
            element={
              <PermissionRoute permission="VIEW_CLIENTS">
                <ClientsPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <PermissionRoute permission="VIEW_ORDERS">
                <OrdersPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/basket-orders"
            element={
              <PermissionRoute permission="VIEW_ORDERS">
                <BasketOrdersPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/risk"
            element={
              <PermissionRoute permission="VIEW_RISK">
                <RiskPage />
              </PermissionRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="/clients/:id"
            element={
              <PermissionRoute permission="VIEW_CLIENTS">
                <ClientDetailPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PermissionRoute permission="VIEW_USERS">
                <UsersPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/audit"
            element={
              <PermissionRoute permission="VIEW_AUDIT">
                <AuditPage />
              </PermissionRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
