import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./MainRouter";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </Router>
  );
}

export default App;
