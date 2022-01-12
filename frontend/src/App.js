import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import SeminarPage from "./components/SeminarPage";
import Navbar from "./components/Navbar";

import "./App.scss";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/seminars" component={SeminarPage} />
      </div>
    </Router>
  );
}

export default App;
