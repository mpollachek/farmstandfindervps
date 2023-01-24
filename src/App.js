import { Routes, Route, Outlet } from "react-router-dom";
import { useState, createContext } from "react";
import FarmstandsPage from "./pages/FarmstandsPage";
import FarmstandDetailPage from "./pages/FarmstandDetailPage";
import MapsPage from "./pages/MapsPage";
import FavoritesPage from "./pages/FavoritesPage";
import TestPage from "./pages/TestPage";
import Header from "./components/Header";
import TestPage2 from "./pages/TestPage2";

export const UserContext = createContext();
export const MapContext = createContext();

const App = () => {

  // Declare user and current farms (GET) useStates. create context with provider nested within <Routes>. Remove create context and Providers from Map.js 

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  const [farmstands, setFarmstands] = useState([]);

  return (
    <div className="App">
      <UserContext.Provider value={{userId, setUserId, userName, setUserName}}> 
      <MapContext.Provider value={{farmstands, setFarmstands}}>
      <Routes>             
        <Route path="/" element={<MapsPage />} />
        <Route path="farmstands" element={<FarmstandsPage />} />
          <Route
            path="farmstands/:farmstandId"
            element={<FarmstandDetailPage />}
          />
          <Route path='favorites' element={<FavoritesPage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="test2" element={<TestPage2 />} />        
      </Routes>
      </MapContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;