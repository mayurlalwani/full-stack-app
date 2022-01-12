import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Navbar from "./components/Navbar";

import "./App.scss";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </div>
    </Router>
  );
}

export default App;
