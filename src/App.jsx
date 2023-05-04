import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layount from "./components/Dashboard/Layount";
import Medician from "./components/Medician/Medician";
import PageComponent from "./components/PageComponents/PageComponent";
import Purchase from "./components/Purchase/Purchase";
import Sell from "./components/Sell/Sell";



function App() {
  
  return (
    <div className="app">
      <Router>
        <PageComponent>
          <Routes>
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/dashboard" element={<Layount />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/medician" element={<Medician />} />
          </Routes>
        </PageComponent>
      </Router>
    </div>
  );
}

export default App;
