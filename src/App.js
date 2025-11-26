import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FruitAnimation from "./pages/FruitAnimation";
import FruitSliderFive from "./pages/FruitSliderFive";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FruitAnimation />} />
        <Route path="/fiveslides" element={<FruitSliderFive />} />

      </Routes>
    </Router>
  );
}

export default App;
