import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layount from "./components/Layount";
import PageComponent from "./components/PageComponent";

function App() {
  return (
    <div className="app">
      <Router>
      <PageComponent />
          <Routes>
            {/* <Route exact path='/' element={<Layount/>}/> */}
          </Routes> 
      </Router>
    </div>
  );
}

export default App;
