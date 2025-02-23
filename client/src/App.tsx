import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/home";
import Bookings from "./pages/bookings";
import Main from "./pages/index";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
