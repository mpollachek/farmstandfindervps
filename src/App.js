import { Routes, Route, useParams, Outlet } from "react-router-dom";
import { useState, createContext } from "react";
import FarmstandsPage from "./pages/FarmstandsPage";
import FarmstandDetailPage from "./pages/FarmstandDetailPage";
import MapsPage from "./pages/MapsPage";
import FavoritesPage from "./pages/FavoritesPage";
import TestPage from "./pages/TestPage";
import Header from "./components/Header";
import TestPage2 from "./pages/TestPage2";

export const UserContext = createContext();
export const FarmstandsContext = createContext();
export const MapContext = createContext();
export const SingleFarmstandContext = createContext();
export const CommentsContext = createContext();

const App = () => {

  // Declare user and current farms (GET) useStates. create context with provider nested within <Routes>. Remove create context and Providers from Map.js 

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userOwned, setUserOwned] = useState([])

  const [farmstands, setFarmstands] = useState([]); //all farmstands in view

  const [farmstand, setFarmstand] = useState({ products: [], images: [], comments: [], owner: [], farmstandType: [], location: {coordinates: []} });  // 1 farmstand by farmstand id

  const [comments, setComments] = useState([
    {
      commentId: "",
      rating: "",
      text: "",
      author: "",
      date: "2000-08-04T20:11Z",
      updated: "",
    },
  ]);

  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const { centerParam } = useParams()

  return (
    <div className="App">
      <UserContext.Provider value={{userId, setUserId, userName, setUserName, userOwned, setUserOwned}}> 
      <FarmstandsContext.Provider value={{farmstands, setFarmstands}}>
      <SingleFarmstandContext.Provider value={{farmstand, setFarmstand}}>
      <CommentsContext.Provider value={{comments, setComments}}>
      <MapContext.Provider value={{mapCenter, setMapCenter, centerParam}}>
      <Routes>             
        <Route path="/" element={<MapsPage />} />
        {/* <Route path="/:mapCenter" element={<MapsPage mapCenter={mapCenter} />}/> */}
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
      </CommentsContext.Provider>
      </SingleFarmstandContext.Provider>
      </FarmstandsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;