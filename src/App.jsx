import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layount from "./components/Dashboard/Layount";
import Medician from "./components/Medician/Medician";
import PageComponent from "./components/PageComponents/PageComponent";
import Purchase from "./components/Purchase/Purchase";
import Reports from "./components/Reports/Reports";
import Sell from "./components/Sell/Sell";
import Login from "./Login";
import { useIsAuthenticated } from "react-auth-kit";

function App() {
  const RequireAuth = ({ children }) => {
    const isAuthenticated = useIsAuthenticated();
    if (!isAuthenticated()) {
      return <Login />;
    }
    return children;
  };

  

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <PageComponent>
                  <Layount />
                </PageComponent>
              </RequireAuth>
            }
          />
          <Route
            path="/purchase"
            element={
              <RequireAuth>
                <PageComponent>
                  <Purchase />
                </PageComponent>
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <PageComponent>
                  <Layount />
                </PageComponent>
              </RequireAuth>
            }
          />
          <Route
            path="/sell"
            element={
              <RequireAuth>
                <PageComponent>
                  <Sell />
                </PageComponent>
              </RequireAuth>
            }
          />
          <Route
            path="/medician"
            element={
              <RequireAuth>
                <PageComponent>
                  <Medician />
                </PageComponent>
              </RequireAuth>
            }
          />
          <Route
            path="/reports"
            element={
              <RequireAuth>
                <PageComponent>
                  <Reports />
                </PageComponent>
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
