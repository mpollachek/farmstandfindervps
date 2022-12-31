import { Routes, Route, Outlet } from "react-router-dom";
import FarmstandsPage from "./pages/FarmstandsPage";
import FarmstandDetailPage from "./pages/FarmstandDetailPage";
import MapsPage from "./pages/MapsPage";
import TestPage from "./pages/TestPage";
import Header from "./components/Header";
import TestPage2 from "./pages/TestPage2";

const App = () => {

  return (
    <div className="App">
      <Routes>        
        <Route path="/" element={<MapsPage />} />
        <Route path="farmstands" element={<FarmstandsPage />} />
          <Route
            path="farmstands/:farmstandId"
            element={<FarmstandDetailPage />}
          />
        <Route path="test" element={<TestPage />} />
        <Route path="test2" element={<TestPage2 />} />
      </Routes>
    </div>
  );
}

export default App;