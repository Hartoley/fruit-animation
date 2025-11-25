import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FruitAnimation from "./pages/FruitAnimation";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FruitAnimation />} />

      </Routes>
    </Router>
  );
}

export default App;
