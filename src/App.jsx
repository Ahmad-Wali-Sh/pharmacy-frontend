import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layount from "./components/Layount";
import PageComponent from "./components/PageComponents/PageComponent";
import Purchase from "./components/Purchase/Purchase";
import Sell from "./components/Sell/Sell";

function App() {
  return (
    <div className="app">
      <Router>
        <PageComponent>
          <Routes>
            {/* <Route exact path="/" element={} /> */}
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/dashboard" element={<Layount />} />
            <Route path="/sell" element={<Sell />} />
          </Routes>
        </PageComponent>
      </Router>
    </div>
  );
}

export default App;
