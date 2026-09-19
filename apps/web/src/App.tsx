import {
  DashboardPage,
} from "./pages/DashboardPage";

import {
  LoginPage,
} from "./pages/LoginPage";

function App() {
  const token =
    localStorage.getItem(
      "accessToken",
    );

  if (!token) {
    return <LoginPage />;
  }

  return <DashboardPage />;
}

export default App;