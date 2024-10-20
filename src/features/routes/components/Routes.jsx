import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Medician from "@/components/Medician/Medician";
import PageComponent from "@/components/PageComponents/PageComponent";
import Purchase from "@/components/Purchase/Purchase";
import Reports from "@/components/Reports/Reports";
import Sell from "@/components/Sell/Sell";
import Login from "@/features/auth/components/Login";
import { useIsAuthenticated } from "react-auth-kit";
import RevenueDashboard from "@/components/Revenue/RevenueDashboard";
import "@/styles.scss";
import "@/assets/fontawesome/css/fontawesome.min.css";
import "@/assets/fontawesome/css/brands.css";
import "@/assets/fontawesome/css/solid.css";
import Return from "@/components/Purchase/Return/Return";
import Journal from "@/components/Journal/Journal";


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
                  <Purchase />
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
            path="/return"
            element={
              <RequireAuth>
                <PageComponent>
                  <Return />
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
          <Route
            path="/revenue"
            element={
              <RequireAuth>
                <PageComponent>
                  <RevenueDashboard />
                </PageComponent>
              </RequireAuth>
            }
          />
          <Route
            path="/journal"
            element={
              <RequireAuth>
                <PageComponent>
                  <Journal />
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
