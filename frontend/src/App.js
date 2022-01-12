import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";

import "./App.scss";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Route path="/login" component={LoginPage} />
      </div>
    </Router>
  );
}

export default App;
