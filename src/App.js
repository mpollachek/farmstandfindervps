import { Routes, Route, useParams, Outlet } from "react-router-dom";
import { useState, createContext } from "react";
import FarmstandsPage from "./pages/FarmstandsPage";
import FarmstandDetailPage from "./pages/FarmstandDetailPage";
import MapsPage from "./pages/MapsPage";
import FavoritesPage from "./pages/FavoritesPage";
import MyCommentsPage from "./pages/MyCommentsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TestPage from "./pages/TestPage";
import Header from "./components/Header";
import TestPage2 from "./pages/TestPage2";
import RemoveImages from "./components/RemoveImages";
import CookieChecker from "./components/CookieChecker";
import RedirectPage from "./pages/RedirectPage";
import SelectCoverImage from "./components/SelectCoverImage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TOSPage from "./pages/TOSPage";
import ContactUsPage from "./pages/ContactUsPage";

export const UserContext = createContext();
export const FarmstandsContext = createContext();
export const MapContext = createContext();
export const SingleFarmstandContext = createContext();
export const CommentsContext = createContext();
export const SidebarContext = createContext();

const App = () => {

  // Declare user and current farms (GET) useStates. create context with provider nested within <Routes>. Remove create context and Providers from Map.js 

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userOwned, setUserOwned] = useState([])

  const [farmstands, setFarmstands] = useState([]); //all farmstands in view

  const [farmstand, setFarmstand] = useState({ products: [], images: [], comments: [], owner: [], ownercomments: [], farmstandType: [], seasons: [], location: {coordinates: []} });  // 1 farmstand by farmstand id

    // sidebar states:
    const [sidebarProducts, setSidebarProducts] = useState([]);
    const [sidebarSeasons, setSidebarSeasons] = useState("yearRound");
    const [sidebarSearch, setSidebarSearch] = useState("");
    const [sidebarTypes, setSidebarTypes] = useState([]);
    const [sidebarProductSearch, setSidebarProductSearch] = useState("all")

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
      <UserContext.Provider value={{userId, setUserId, userName, setUserName, userOwned, setUserOwned, userEmail, setUserEmail}}> 
      <FarmstandsContext.Provider value={{farmstands, setFarmstands}}>
      <SingleFarmstandContext.Provider value={{farmstand, setFarmstand}}>
      <CommentsContext.Provider value={{comments, setComments}}>
      <SidebarContext.Provider value={{sidebarProducts, setSidebarProducts, sidebarSeasons, setSidebarSeasons, sidebarSearch, setSidebarSearch, sidebarTypes, setSidebarTypes, sidebarProductSearch, setSidebarProductSearch }}>
      <MapContext.Provider value={{mapCenter, setMapCenter, centerParam}}>
      <CookieChecker />
      <Routes>             
        <Route path="/" element={<MapsPage />} />
        {/* <Route path="/:mapCenter" element={<MapsPage mapCenter={mapCenter} />}/> */}
        <Route path="farmstands" element={<FarmstandsPage />} />
          <Route
            path="farmstands/:farmstandId"
            element={<FarmstandDetailPage />}
          />
            <Route
              path="farmstands/:farmstandId/removeImages"
              element={<RemoveImages />}
            />
            <Route
              path="farmstands/:farmstandId/selectcoverimage"
              element={<SelectCoverImage />}
            />
        <Route path='favorites' element={<FavoritesPage />} />
        <Route path='mycomments' element={<MyCommentsPage />} /> 
        <Route path='profile' element={<ProfilePage />} /> 
        <Route path='redirect' element={<RedirectPage/>} />
        <Route path='privacy' element={<PrivacyPolicyPage/>} />
        <Route path='termsofservice' element={<TOSPage/>} />
        <Route path='contactus' element={<ContactUsPage/>} />
        <Route path="passwordreset/:userId" element={<ResetPasswordPage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="test2" element={<TestPage2 />} />        
      </Routes>
      </MapContext.Provider>
      </SidebarContext.Provider>
      </CommentsContext.Provider>
      </SingleFarmstandContext.Provider>
      </FarmstandsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;