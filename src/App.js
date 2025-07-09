import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CharacterPage from "./pages/CharacterPage";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import UniversePage from "./pages/UniversePage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/universe/:name" element={<UniversePage />} />
      </Routes>
    </Router>
  );
}

export default App;
