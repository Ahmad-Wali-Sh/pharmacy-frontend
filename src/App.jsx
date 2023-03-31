import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layount from "./components/Layount";
import PageComponent from "./components/PageComponents/PageComponent";

function App() {
  return (
    <div className="app">
      <Router>
        <PageComponent>
          <Routes>
            {/* <Route exact path="/" element={} /> */}
            <Route path="/dashboard" element={<Layount />} />
          </Routes>
        </PageComponent>
      </Router>
    </div>
  );
}

export default App;
