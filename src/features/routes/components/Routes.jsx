import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Medician from "@/components/Medician/Medician";
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
import Layout from "@/features/layout/components/Layout";

function ApplicationRoutes() {
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
                <Layout>
                  <Purchase />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/purchase"
            element={
              <RequireAuth>
                <Layout>
                  <Purchase />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/sell"
            element={
              <RequireAuth>
                <Layout>
                  <Sell />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/return"
            element={
              <RequireAuth>
                <Layout>
                  <Return />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/medician"
            element={
              <RequireAuth>
                <Layout>
                  <Medician />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/reports"
            element={
              <RequireAuth>
                <Layout>
                  <Reports />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/revenue"
            element={
              <RequireAuth>
                <Layout>
                  <RevenueDashboard />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/journal"
            element={
              <RequireAuth>
                <Layout>
                  <Journal />
                </Layout>
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default ApplicationRoutes;
